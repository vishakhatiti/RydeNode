const express = require("express");
const router = express.Router();

const {
  requestRide,
  approveRideByOwner,
  acceptRideByDriver,
  completeRide
} = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/request", authMiddleware, authorizeRoles("customer"), requestRide);
router.post("/approve", approveRideByOwner);
router.post("/accept", authMiddleware, authorizeRoles("driver"), acceptRideByDriver);
router.post("/complete", completeRide);

module.exports = router;
