const express = require("express");
const router = express.Router();

const {
  addVehicle,
  getOwnerVehicles
} = require("../controllers/vehicleController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, authorizeRoles("owner"), addVehicle);
router.post("/add", authMiddleware, authorizeRoles("owner"), addVehicle);
router.get("/", getOwnerVehicles);

module.exports = router;
