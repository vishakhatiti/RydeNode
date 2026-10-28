import React from "react";

import GlassCard from "./GlassCard";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

function VehicleCard({ vehicle, onToggle, onDelete, busy = false }) {
  const available = vehicle.availability;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-accent/25 text-brand">
            <Icon name="car" size={22} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">{vehicle.model}</h3>
            <p className="text-sm tracking-wider text-muted">{vehicle.vehicleNumber}</p>
          </div>
        </div>
        <span className="rounded-full bg-fg/10 px-3 py-1 text-xs font-medium capitalize text-muted">{vehicle.type === "suv" ? "SUV" : vehicle.type}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-2 text-sm ${available ? "text-success" : "text-subtle"}`}>
          <span className={`h-2 w-2 rounded-full ${available ? "bg-success" : "bg-subtle"}`} />
          {available ? "Available for rides" : "Unavailable"}
        </span>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" variant={available ? "ghost" : "primary"} disabled={busy} onClick={() => onToggle(vehicle)}>
          {available ? "Set unavailable" : "Set available"}
        </Button>
        {onDelete && (
          <Button variant="ghost" disabled={busy} onClick={() => onDelete(vehicle)} aria-label={`Delete ${vehicle.model}`} className="hover:!border-danger hover:text-danger">
            Delete
          </Button>
        )}
      </div>
    </GlassCard>
  );
}

export default VehicleCard;
