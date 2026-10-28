import React from "react";
import { Link } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import VehicleCard from "../components/VehicleCard";
import Icon from "../components/ui/Icon";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import useAuth from "../hooks/useAuth";
import useVehicles from "../hooks/useVehicles";

function OwnerDashboard() {
  const { user } = useAuth();
  const { vehicles, loading, busyId, toggleAvailability } = useVehicles();
  const availableCount = vehicles.filter((v) => v.availability).length;

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
        <StatCard icon="car" label="Vehicles" value={vehicles.length} />
        <StatCard icon="check" label="Available now" value={availableCount} />
        <StatCard icon="list" label="Pending approvals" value="0" hint="Coming soon" />
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-semibold">Your fleet</h2>
          {loading ? (
            <p className="text-sm text-subtle">Loading vehicles…</p>
          ) : vehicles.length === 0 ? (
            <GlassCard className="flex flex-col items-center gap-2 py-10 text-center text-muted">
              <Icon name="car" size={32} className="text-brand" />
              <p className="text-sm">You have no vehicles yet.</p>
              <Link to="/vehicles" className="text-sm font-semibold text-brand hover:underline">
                Add your first vehicle
              </Link>
            </GlassCard>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  busy={busyId === vehicle._id}
                  onToggle={toggleAvailability}
                />
              ))}
            </div>
          )}
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
