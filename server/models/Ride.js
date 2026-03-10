const mongoose = require("mongoose");

const RIDE_STATUS = {
  PENDING: "pending",
  OWNER_APPROVED: "owner_approved",
  DRIVER_ASSIGNED: "driver_assigned",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};

const STATUS_TRANSITIONS = {
  [RIDE_STATUS.PENDING]: [RIDE_STATUS.OWNER_APPROVED],
  [RIDE_STATUS.OWNER_APPROVED]: [RIDE_STATUS.DRIVER_ASSIGNED],
  [RIDE_STATUS.DRIVER_ASSIGNED]: [RIDE_STATUS.ONGOING],
  [RIDE_STATUS.ONGOING]: [RIDE_STATUS.COMPLETED],
  [RIDE_STATUS.COMPLETED]: [],
  [RIDE_STATUS.CANCELLED]: []
};

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
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    enum: Object.values(RIDE_STATUS),
    default: RIDE_STATUS.PENDING
  }
}, { timestamps: true });

rideSchema.methods.canTransitionTo = function canTransitionTo(nextStatus) {
  const allowedStatuses = STATUS_TRANSITIONS[this.status] || [];
  return allowedStatuses.includes(nextStatus);
};

rideSchema.statics.RIDE_STATUS = RIDE_STATUS;

module.exports = mongoose.model("Ride", rideSchema);
