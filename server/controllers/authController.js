const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const ALLOWED_ROLES = ["customer", "driver", "owner"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id)
});

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const selectedRole = role || "customer";

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }

    if (!ALLOWED_ROLES.includes(selectedRole)) {
      return res.status(400).json({ error: "Invalid role selected" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, role: selectedRole });

    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json(buildAuthResponse(user));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  const { _id, name, email, role } = req.user;
  return res.status(200).json({ _id, name, email, role });
};
