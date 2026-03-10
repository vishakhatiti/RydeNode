const Ride = require("../models/Ride");

exports.requestRide = async (req, res) => {
  const ride = await Ride.create(req.body);
  res.json(ride);
};

exports.approveRideByOwner = async (req, res) => {
  const ride = await Ride.findByIdAndUpdate(
    req.body.rideId,
    { status: "ownerApproved" },
    { new: true }
  );
  res.json(ride);
};

exports.acceptRideByDriver = async (req, res) => {
  const ride = await Ride.findByIdAndUpdate(
    req.body.rideId,
    { status: "driverAccepted" },
    { new: true }
  );
  res.json(ride);
};

exports.completeRide = async (req, res) => {
  const ride = await Ride.findByIdAndUpdate(
    req.body.rideId,
    { status: "completed" },
    { new: true }
  );
  res.json(ride);
};