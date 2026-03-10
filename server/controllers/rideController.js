const Ride = require("../models/Ride");
const Vehicle = require("../models/Vehicle");

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
    const rides = await Ride.find({ status: "owner_approved" })
      .sort({ createdAt: -1 })
      .populate("customerId", "name email")
      .populate("vehicleId")
      .populate("ownerId", "name email");

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.getOwnerRideRequests = async (req, res) => {
  try {
    const ownerId = getAuthenticatedUserId(req);

    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const rides = await Ride.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("customerId", "name email")
      .populate("driverId", "name email")
      .populate("vehicleId");

    return res.status(200).json(rides);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.approveRideVehicle = async (req, res) => {
  try {
    const ownerId = getAuthenticatedUserId(req);
    const { id } = req.params;
    const { vehicleId } = req.body;

    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!vehicleId) {
      return res.status(400).json({ error: "vehicleId is required" });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (ride.status !== "pending") {
      return res.status(400).json({ error: "Only pending rides can be approved" });
    }

    const vehicle = await Vehicle.findOne({ _id: vehicleId, ownerId });

    if (!vehicle) {
      return res.status(403).json({ error: "Forbidden: selected vehicle does not belong to owner" });
    }

    ride.vehicleId = vehicle._id;
    ride.ownerId = ownerId;
    ride.status = "owner_approved";

    await ride.save();

    const populatedRide = await Ride.findById(ride._id)
      .populate("customerId", "name email")
      .populate("driverId", "name email")
      .populate("vehicleId")
      .populate("ownerId", "name email");

    return res.status(200).json({ message: "Ride vehicle approved successfully", ride: populatedRide });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.rejectRideVehicle = async (req, res) => {
  try {
    const ownerId = getAuthenticatedUserId(req);
    const { id } = req.params;

    if (!ownerId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (ride.status !== "pending") {
      return res.status(400).json({ error: "Only pending rides can be rejected" });
    }

    ride.ownerId = ownerId;
    ride.status = "cancelled";

    await ride.save();

    return res.status(200).json({ message: "Ride request rejected successfully", ride });
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

    if (ride.status !== "owner_approved" || !ride.canTransitionTo("driver_assigned")) {
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
