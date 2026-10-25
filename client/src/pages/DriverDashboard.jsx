import React, { useEffect, useState } from "react";

import GlassCard from "../components/GlassCard";
import Icon from "../components/ui/Icon";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import useAuth from "../hooks/useAuth";
import { rideApi } from "../services/api";

function DriverDashboard() {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    rideApi.availableRides().then(({ data }) => setRides(data)).catch(() => setRides([]));
  }, []);

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0] || "driver"}`}
        subtitle={online ? "You are online and visible for rides." : "You are offline. Go online to see rides."}
        action={
          <button
            type="button"
            onClick={() => setOnline((v) => !v)}
            aria-pressed={online}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              online ? "border-success/50 bg-success/10 text-success" : "border-line/30 text-muted hover:border-brand"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${online ? "animate-pulse bg-success" : "bg-subtle"}`} />
            {online ? "Online" : "Offline"}
          </button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon="wallet" label="Today's earnings" value="₹0" hint="Sample data" />
        <StatCard icon="car" label="Trips today" value="0" hint="Sample data" />
        <StatCard icon="clock" label="Hours online" value="0h" hint="Sample data" />
      </div>

      <GlassCard>
        <h2 className="text-xl font-semibold">Available rides</h2>
        <div className="mt-4 space-y-3">
          {rides.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center text-muted">
              <Icon name="route" size={32} className="text-brand" />
              <p className="text-sm">No rides yet. Stay online and new requests will appear here.</p>
            </div>
          ) : (
            rides.map((ride) => (
              <div key={ride._id} className="flex items-center justify-between rounded-xl border border-line/15 p-3 transition hover:border-brand/40">
                <span className="text-sm">
                  {ride.pickupLocation} → {ride.destination}
                </span>
                <button className="glow-btn rounded-lg px-3 py-1 text-sm" type="button">
                  Accept
                </button>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}

export default DriverDashboard;
