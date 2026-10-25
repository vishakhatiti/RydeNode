import React, { useState } from "react";
import { Link } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import VehicleCard from "../components/VehicleCard";
import Icon from "../components/ui/Icon";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import useAuth from "../hooks/useAuth";

const seedVehicles = [
  { _id: "1", name: "Sample: Mercedes E-Class", type: "Sedan", plate: "KA-01-AB-1024", available: true },
  { _id: "2", name: "Sample: BMW X5", type: "SUV", plate: "KA-05-CD-9081", available: false }
];

function OwnerDashboard() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState(seedVehicles);

  const toggleAvailability = (id) => {
    setVehicles((prev) => prev.map((v) => (v._id === id ? { ...v, available: !v.available } : v)));
  };

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0] || "owner"}`}
        subtitle="Manage your fleet and approve ride requests."
        action={
          <Link to="/vehicles" className="glow-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold">
            Add vehicle <Icon name="arrow" size={16} />
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon="car" label="Vehicles" value={vehicles.length} hint="Sample data" />
        <StatCard icon="list" label="Pending approvals" value="0" hint="Sample data" />
        <StatCard icon="chart" label="Utilisation" value="--" hint="Sample data" />
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-semibold">Your fleet</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} onToggle={toggleAvailability} />
            ))}
          </div>
        </div>
        <GlassCard className="h-fit">
          <h3 className="font-semibold">Ride approvals</h3>
          <p className="mt-2 text-sm text-muted">Incoming ride requests will appear here for you to approve with one of your vehicles.</p>
        </GlassCard>
      </section>
    </div>
  );
}

export default OwnerDashboard;
