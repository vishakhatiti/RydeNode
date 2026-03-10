import React, { useEffect, useState } from "react";
import { rideApi } from "../services/api";
import GlassCard from "../components/GlassCard";

function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    rideApi.availableRides().then(({ data }) => setRides(data)).catch(() => setRides([]));
  }, []);

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <GlassCard className="lg:col-span-2">
        <h2 className="text-xl font-semibold">Available Rides</h2>
        <div className="mt-4 space-y-3">
          {rides.length === 0 ? (
            <p className="text-sm text-gray-300">No rides yet. Stay online for new requests.</p>
          ) : (
            rides.map((ride) => (
              <div key={ride._id} className="flex items-center justify-between rounded-xl border border-white/10 p-3">
                <span>{ride.pickup} → {ride.destination}</span>
                <button className="glow-btn rounded-lg px-3 py-1 text-sm" type="button">Accept</button>
              </div>
            ))
          )}
        </div>
      </GlassCard>
      <div className="space-y-6">
        <GlassCard>
          <p className="text-sm text-gray-300">Today Earnings</p>
          <p className="mt-1 text-3xl font-bold">₹5,280</p>
        </GlassCard>
        <GlassCard>
          <label className="flex cursor-pointer items-center justify-between">
            <span>Shift Availability</span>
            <input checked={online} onChange={() => setOnline((v) => !v)} type="checkbox" aria-label="Toggle shift availability" />
          </label>
        </GlassCard>
      </div>
    </section>
  );
}

export default DriverDashboard;
