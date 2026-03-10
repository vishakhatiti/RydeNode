const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },
  pickupLocation: String,
  dropLocation: String,
  status: {
    type: String,
    default: "requested"
  },
  fare: Number
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);