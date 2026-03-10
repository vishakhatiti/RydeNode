const Ride = require("../models/Ride");

const getAuthenticatedUserId = (req) => req.user?._id || req.user?.id;

exports.createRideRequest = async (req, res) => {
  try {
    const customerId = getAuthenticatedUserId(req);
    const { pickupLocation, destination } = req.body;

    if (!customerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!pickupLocation || !destination) {
      return res.status(400).json({ error: "pickupLocation and destination are required" });
    }

    const ride = await Ride.create({
      customerId,
      pickupLocation,
      destination
    });

    return res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCustomerRides = async (req, res) => {
  try {
    const customerId = getAuthenticatedUserId(req);

    if (!customerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const rides = await Ride.find({ customerId })
      .sort({ createdAt: -1 })
      .populate("driverId", "name email role")
      .populate("vehicleId");

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getPendingRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("customerId", "name email");

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("customerId", "name email")
      .populate("vehicleId");

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.acceptRide = async (req, res) => {
  try {
    const driverId = getAuthenticatedUserId(req);
    const { id } = req.params;

    if (!driverId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (!ride.canTransitionTo("driver_assigned")) {
      return res.status(400).json({ error: "Ride cannot be accepted in its current status" });
    }

    if (ride.driverId) {
      return res.status(400).json({ error: "Ride is already assigned to a driver" });
    }

    ride.driverId = driverId;
    ride.status = "driver_assigned";

    await ride.save();

    return res.status(200).json({ message: "Ride accepted successfully", ride });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.startRide = async (req, res) => {
  try {
    const driverId = getAuthenticatedUserId(req);
    const { id } = req.params;

    if (!driverId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (!ride.driverId || ride.driverId.toString() !== driverId.toString()) {
      return res.status(403).json({ error: "Forbidden: ride is not assigned to this driver" });
    }

    if (!ride.canTransitionTo("ongoing")) {
      return res.status(400).json({ error: "Ride cannot be started in its current status" });
    }

    ride.status = "ongoing";
    await ride.save();

    return res.status(200).json({ message: "Ride started successfully", ride });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.completeRide = async (req, res) => {
  try {
    const driverId = getAuthenticatedUserId(req);
    const { id } = req.params;

    if (!driverId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (!ride.driverId || ride.driverId.toString() !== driverId.toString()) {
      return res.status(403).json({ error: "Forbidden: ride is not assigned to this driver" });
    }

    if (!ride.canTransitionTo("completed")) {
      return res.status(400).json({ error: "Ride cannot be completed in its current status" });
    }

    ride.status = "completed";
    await ride.save();

    return res.status(200).json({ message: "Ride completed successfully", ride });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
