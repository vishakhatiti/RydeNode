const express = require("express");

const {
  addVehicle,
  getOwnerVehicles,
  updateVehicleAvailability,
  deleteVehicle
} = require("../controllers/vehicleController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("owner"), addVehicle);
router.get("/my", authMiddleware, authorizeRoles("owner"), getOwnerVehicles);
router.patch("/:id", authMiddleware, authorizeRoles("owner"), updateVehicleAvailability);
router.delete("/:id", authMiddleware, authorizeRoles("owner"), deleteVehicle);

module.exports = router;
