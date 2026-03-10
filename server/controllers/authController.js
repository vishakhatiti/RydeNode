const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "customer" } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  res.json({ message: "Login route working" });
};