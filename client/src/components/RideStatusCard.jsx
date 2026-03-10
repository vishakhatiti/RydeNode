import React from "react";
import GlassCard from "./GlassCard";

function RideStatusCard({ status = "Searching for driver", eta = "4 mins" }) {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-white">Ride Status</h3>
      <p className="mt-2 text-electric-blue">{status}</p>
      <p className="mt-1 text-sm text-gray-300">Estimated arrival: {eta}</p>
    </GlassCard>
  );
}

export default RideStatusCard;
