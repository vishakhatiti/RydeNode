import React, { useState } from "react";

import GlassCard from "../components/GlassCard";
import RideButton3D from "../components/RideButton3D";
import MapView from "../components/MapView";
import RideStatusCard from "../components/RideStatusCard";
import useSocket from "../hooks/useSocket";

function CustomerDashboard() {
  const [status, setStatus] = useState("Searching for driver");

  useSocket({
    rideStatus: (payload) => setStatus(payload.status || "Driver assigned")
  });

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <RideButton3D onClick={() => setStatus("Ride requested")} />
        <MapView />
      </div>
      <div className="space-y-6">
        <GlassCard>
          <h3 className="text-lg font-semibold">Fare Preview</h3>
          <p className="mt-2 text-sm text-gray-300">Estimated fare: ₹420 · ETA: 14 mins</p>
        </GlassCard>
        <RideStatusCard status={status} eta="6 mins" />
      </div>
    </section>
  );
}

export default CustomerDashboard;
