const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    default: null
  },
  pickupLocation: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "driver_assigned", "ongoing", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);
