const jwt = require("jsonwebtoken");

const Ride = require("../models/Ride");
const User = require("../models/User");

const LOCATION_THROTTLE_MS = 1000;
const lastLocationUpdateByDriver = new Map();

const getTokenFromSocket = (socket) => {
  const authHeader = socket.handshake.headers?.authorization || "";
  const authToken = socket.handshake.auth?.token || "";

  if (authToken) {
    return authToken;
  }

  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
};

const parseLocationPayload = (payload = {}) => {
  const { driverId, rideId, latitude, longitude } = payload;

  return {
    driverId,
    rideId,
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
};

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = getTokenFromSocket(socket);

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("role");

      if (!user || user.role !== "driver") {
        return next(new Error("Only drivers can connect to location socket"));
      }

      socket.user = {
        id: decoded.id,
        role: user.role
      };

      return next();
    } catch (error) {
      return next(new Error("Socket authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("joinRideRoom", async ({ rideId } = {}) => {
      if (!rideId) {
        socket.emit("locationError", { message: "rideId is required" });
        return;
      }

      const rideExists = await Ride.exists({ _id: rideId });
      if (!rideExists) {
        socket.emit("locationError", { message: "Ride does not exist" });
        return;
      }

      socket.join(rideId);
      socket.emit("joinedRideRoom", { rideId });
    });

    socket.on("driverLocationUpdate", async (payload = {}) => {
      try {
        const { driverId, rideId, latitude, longitude } = parseLocationPayload(payload);

        if (!rideId || !driverId || Number.isNaN(latitude) || Number.isNaN(longitude)) {
          socket.emit("locationError", { message: "Invalid location payload" });
          return;
        }

        if (socket.user.id !== driverId) {
          socket.emit("locationError", { message: "Driver identity mismatch" });
          return;
        }

        const now = Date.now();
        const previousUpdate = lastLocationUpdateByDriver.get(driverId);
        if (previousUpdate && now - previousUpdate < LOCATION_THROTTLE_MS) {
          socket.emit("locationError", { message: "Location updates are throttled" });
          return;
        }

        const ride = await Ride.findById(rideId).select("driverId");
        if (!ride) {
          socket.emit("locationError", { message: "Ride does not exist" });
          return;
        }

        if (!ride.driverId || ride.driverId.toString() !== driverId) {
          socket.emit("locationError", { message: "Driver is not assigned to this ride" });
          return;
        }

        lastLocationUpdateByDriver.set(driverId, now);
        socket.join(rideId);

        io.to(rideId).emit("driverLocation", {
          driverId,
          latitude,
          longitude
        });
      } catch (error) {
        socket.emit("locationError", { message: "Unable to process location update" });
      }
    });
  });
};
