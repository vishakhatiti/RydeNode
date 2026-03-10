import React, { useState } from "react";

import GlassCard from "../components/GlassCard";
import VehicleCard from "../components/VehicleCard";

const seedVehicles = [
  { _id: "1", name: "Mercedes E-Class", type: "Sedan", plate: "KA-01-AB-1024", available: true },
  { _id: "2", name: "BMW X5", type: "SUV", plate: "KA-05-CD-9081", available: false }
];

function OwnerDashboard() {
  const [vehicles, setVehicles] = useState(seedVehicles);

  const toggleAvailability = (id) => {
    setVehicles((prev) => prev.map((v) => (v._id === id ? { ...v, available: !v.available } : v)));
  };

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h2 className="text-2xl font-semibold">Fleet Management</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} onToggle={toggleAvailability} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <GlassCard>
          <h3 className="font-semibold">Ride Approvals</h3>
          <p className="mt-2 text-sm text-gray-300">12 pending requests requiring owner confirmation.</p>
        </GlassCard>
        <GlassCard>
          <h3 className="font-semibold">Vehicle Analytics</h3>
          <p className="mt-2 text-sm text-gray-300">Utilization 87% · Avg ROI ₹42,000/month</p>
        </GlassCard>
      </div>
    </section>
  );
}

export default OwnerDashboard;
