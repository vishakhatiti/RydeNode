import React, { useState } from "react";
import { Link } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import MapView from "../components/MapView";
import RideStatusCard from "../components/RideStatusCard";
import Icon from "../components/ui/Icon";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";

function CustomerDashboard() {
  const { user } = useAuth();
  const [status, setStatus] = useState("No active ride");

  useSocket({
    rideStatus: (payload) => setStatus(payload.status || "Driver assigned")
  });

  return (
    <div>
      <PageHeader
        title={`Hello, ${user?.name?.split(" ")[0] || "there"} 👋`}
        subtitle="Where are we going today?"
        action={
          <Link to="/request-ride" className="glow-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
            Book a ride <Icon name="arrow" size={16} />
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon="car" label="Total rides" value="0" hint="Sample data" />
        <StatCard icon="wallet" label="Spent" value="₹0" hint="Sample data" />
        <StatCard icon="star" label="Your rating" value="--" hint="Sample data" />
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MapView />
        </div>
        <div className="space-y-6">
          <RideStatusCard status={status} eta="--" />
          <GlassCard>
            <h3 className="text-lg font-semibold">Fare preview</h3>
            <p className="mt-2 text-sm text-muted">Enter pickup and destination to see an estimate.</p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

export default CustomerDashboard;
