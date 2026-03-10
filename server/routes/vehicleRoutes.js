const express = require("express");
const router = express.Router();

const {
  addVehicle,
  getOwnerVehicles
} = require("../controllers/vehicleController");

router.post("/add", addVehicle);
router.get("/", getOwnerVehicles);

module.exports = router;