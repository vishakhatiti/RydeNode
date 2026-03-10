import React, { useState } from "react";
import GlassCard from "../components/GlassCard";
import { vehicleApi } from "../services/api";

function VehicleManagement() {
  const [vehicle, setVehicle] = useState({ name: "", type: "", plate: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await vehicleApi.create(vehicle);
    setStatus("Vehicle added successfully.");
  };

  return (
    <GlassCard className="mx-auto max-w-xl">
      <h1 className="text-2xl font-semibold">Add Vehicle</h1>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <input className="input" placeholder="Vehicle Name" required onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })} />
        <input className="input" placeholder="Type" required onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })} />
        <input className="input" placeholder="Plate Number" required onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })} />
        <button className="glow-btn w-full rounded-lg py-2" type="submit">Add Vehicle</button>
      </form>
      {status && <p className="mt-2 text-sm text-electric-blue">{status}</p>}
    </GlassCard>
  );
}

export default VehicleManagement;
