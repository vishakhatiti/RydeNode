import React, { useState } from "react";

import GlassCard from "../components/GlassCard";
import VehicleCard from "../components/VehicleCard";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import PageHeader from "../components/ui/PageHeader";
import useToast from "../hooks/useToast";
import useVehicles from "../hooks/useVehicles";
import { getErrorMessage } from "../services/api";

const TYPES = ["sedan", "suv", "hatchback", "luxury"];
const EMPTY_FORM = { vehicleNumber: "", model: "", type: "sedan" };

function VehicleManagement() {
  const toast = useToast();
  const { vehicles, loading, busyId, addVehicle, toggleAvailability, removeVehicle } = useVehicles();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const update = (field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.vehicleNumber.trim()) next.vehicleNumber = "Enter the registration number";
    if (!form.model.trim()) next.model = "Enter the vehicle model";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const vehicle = await addVehicle(form);
      toast.success(`${vehicle.model} added to your fleet.`);
      setForm(EMPTY_FORM);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    const vehicle = toDelete;
    setToDelete(null);
    await removeVehicle(vehicle);
  };

  return (
    <div>
      <PageHeader title="Vehicles" subtitle="Add the cars you want to offer for rides." />

      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="h-fit">
          <h2 className="text-lg font-semibold">Add a vehicle</h2>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Registration number"
              placeholder="MH12AB1234"
              value={form.vehicleNumber}
              onChange={update("vehicleNumber")}
              error={errors.vehicleNumber}
            />
            <Input label="Model" placeholder="Toyota Innova" value={form.model} onChange={update("model")} error={errors.model} />
            <Input label="Type" as="select" value={form.type} onChange={update("type")}>
              {TYPES.map((type) => (
                <option key={type} value={type} className="bg-surface capitalize">
                  {type === "suv" ? "SUV" : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Input>
            <Button className="w-full" type="submit" loading={saving}>
              {saving ? "Adding…" : "Add vehicle"}
            </Button>
          </form>
        </GlassCard>

        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Your fleet ({vehicles.length})</h2>
          {loading ? (
            <p className="text-sm text-subtle">Loading vehicles…</p>
          ) : vehicles.length === 0 ? (
            <GlassCard className="flex flex-col items-center gap-2 py-10 text-center text-muted">
              <Icon name="car" size={32} className="text-brand" />
              <p className="text-sm">No vehicles yet. Add your first one to start receiving ride requests.</p>
            </GlassCard>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  busy={busyId === vehicle._id}
                  onToggle={toggleAvailability}
                  onDelete={setToDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal open={Boolean(toDelete)} onClose={() => setToDelete(null)} title="Remove this vehicle?">
        <p className="text-sm text-muted">
          {toDelete?.model} ({toDelete?.vehicleNumber}) will be removed from your fleet. This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setToDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default VehicleManagement;
