const User = require("../models/User");

const ALLOWED_ROLES = ["customer", "driver", "owner"];

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const selectedRole = role || "customer";

    if (!ALLOWED_ROLES.includes(selectedRole)) {
      return res.status(400).json({ error: "Invalid role selected" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: selectedRole
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  res.json({ message: "Login route working" });
};
