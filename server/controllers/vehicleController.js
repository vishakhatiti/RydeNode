const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOwnerVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};