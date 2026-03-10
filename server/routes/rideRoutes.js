const express = require("express");
const router = express.Router();

const {
  requestRide,
  approveRideByOwner,
  acceptRideByDriver,
  completeRide
} = require("../controllers/rideController");

router.post("/request", requestRide);
router.post("/approve", approveRideByOwner);
router.post("/accept", acceptRideByDriver);
router.post("/complete", completeRide);

module.exports = router;