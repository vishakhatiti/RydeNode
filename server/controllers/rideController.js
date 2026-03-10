const Ride = require("../models/Ride");

exports.createRideRequest = async (req, res) => {
  try {
    const customerId = req.user?._id || req.user?.id;
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
    const customerId = req.user?._id || req.user?.id;

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
