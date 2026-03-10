import React, { useState } from "react";
import GlassCard from "../components/GlassCard";
import MapView from "../components/MapView";
import { rideApi } from "../services/api";

function RequestRide() {
  const [form, setForm] = useState({ pickup: "", destination: "" });
  const [message, setMessage] = useState("");

  const submitRequest = async (e) => {
    e.preventDefault();
    await rideApi.requestRide(form);
    setMessage("Ride requested successfully.");
  };

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <GlassCard>
        <h1 className="text-2xl font-semibold">Request a Ride</h1>
        <form className="mt-5 space-y-4" onSubmit={submitRequest}>
          <input className="input" placeholder="Pickup" required onChange={(e) => setForm({ ...form, pickup: e.target.value })} />
          <input className="input" placeholder="Destination" required onChange={(e) => setForm({ ...form, destination: e.target.value })} />
          <button className="glow-btn w-full rounded-lg py-2" type="submit">Confirm Ride</button>
        </form>
        {message && <p className="mt-3 text-sm text-electric-blue">{message}</p>}
      </GlassCard>
      <MapView />
    </section>
  );
}

export default RequestRide;
