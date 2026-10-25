const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized: token missing" });
    }

    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Not authorized: user no longer exists" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized: invalid or expired token" });
  }
};
