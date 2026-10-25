import React from "react";
import GlassCard from "./GlassCard";

function VehicleCard({ vehicle, onToggle }) {
  return (
    <GlassCard className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-fg">{vehicle.name}</h3>
        <span className="rounded-full bg-fg/10 px-3 py-1 text-xs text-muted">{vehicle.type}</span>
      </div>
      <p className="text-sm text-subtle">Plate: {vehicle.plate}</p>
      <button
        className="glow-btn w-full rounded-lg px-3 py-2 text-sm"
        onClick={() => onToggle(vehicle._id)}
        type="button"
      >
        {vehicle.available ? "Set Unavailable" : "Set Available"}
      </button>
    </GlassCard>
  );
}

export default VehicleCard;
