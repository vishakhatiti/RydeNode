const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["customer", "driver", "owner"],
    default: "customer"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
