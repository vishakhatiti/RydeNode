import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { rideApi } from "../services/api";

function RideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    rideApi.myRides().then(({ data }) => setRides(data)).catch(() => setRides([]));
  }, []);

  return (
    <GlassCard>
      <h1 className="text-2xl font-semibold">Ride History</h1>
      <div className="mt-4 space-y-2">
        {rides.length === 0 ? (
          <p className="text-sm text-gray-300">No ride history available.</p>
        ) : (
          rides.map((ride) => (
            <div key={ride._id} className="rounded-lg border border-white/10 p-3 text-sm">
              {ride.pickup} → {ride.destination} · {ride.status}
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}

export default RideHistory;
