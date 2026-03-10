const express = require("express");
const router = express.Router();

const {
  createRideRequest,
  getCustomerRides,
  getPendingRides
} = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/request", authMiddleware, authorizeRoles("customer"), createRideRequest);
router.get("/my", authMiddleware, getCustomerRides);
router.get("/pending", authMiddleware, getPendingRides);

module.exports = router;
