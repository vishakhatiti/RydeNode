const express = require("express");
const router = express.Router();

const {
  createRideRequest,
  getCustomerRides,
  getPendingRides,
  getAvailableRides,
  acceptRide,
  startRide,
  completeRide
} = require("../controllers/rideController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/request", authMiddleware, authorizeRoles("customer"), createRideRequest);
router.get("/my", authMiddleware, getCustomerRides);
router.get("/pending", authMiddleware, getPendingRides);

router.get("/available", authMiddleware, authorizeRoles("driver"), getAvailableRides);
router.patch("/:id/accept", authMiddleware, authorizeRoles("driver"), acceptRide);
router.patch("/:id/start", authMiddleware, authorizeRoles("driver"), startRide);
router.patch("/:id/complete", authMiddleware, authorizeRoles("driver"), completeRide);

module.exports = router;
