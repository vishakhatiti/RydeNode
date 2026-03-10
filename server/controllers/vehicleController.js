const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  try {
    const ownerId = req.user?._id || req.user?.id;

    const { vehicleNumber, model, type, availability } = req.body;

    const existingVehicle = await Vehicle.findOne({ vehicleNumber });

    if (existingVehicle) {
      return res.status(400).json({ error: "Vehicle number already exists" });
    }

    const vehicle = await Vehicle.create({
      ownerId,
      vehicleNumber,
      model,
      type,
      availability
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getOwnerVehicles = async (req, res) => {
  try {
    const ownerId = req.user?._id || req.user?.id;

    const vehicles = await Vehicle.find({ ownerId }).sort({ createdAt: -1 });

    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateVehicleAvailability = async (req, res) => {
  try {
    const ownerId = req.user?._id || req.user?.id;
    const { id } = req.params;
    const { availability } = req.body;

    if (typeof availability !== "boolean") {
      return res.status(400).json({ error: "availability must be a boolean" });
    }

    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: id, ownerId },
      { availability },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const ownerId = req.user?._id || req.user?.id;
    const { id } = req.params;

    const vehicle = await Vehicle.findOneAndDelete({ _id: id, ownerId });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
