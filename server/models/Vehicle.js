const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  vehicleNumber: String,
  model: String,
  capacity: Number,
  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);