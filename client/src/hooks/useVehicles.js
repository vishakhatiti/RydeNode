import { useCallback, useEffect, useState } from "react";

import useToast from "./useToast";
import { getErrorMessage, vehicleApi } from "../services/api";

export default function useVehicles() {
  const toast = useToast();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const { data } = await vehicleApi.list();
      setVehicles(data);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not load your vehicles."));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addVehicle = async (payload) => {
    const { data } = await vehicleApi.create(payload);
    setVehicles((prev) => [data, ...prev]);
    return data;
  };

  const toggleAvailability = async (vehicle) => {
    setBusyId(vehicle._id);
    try {
      const { data } = await vehicleApi.setAvailability(vehicle._id, !vehicle.availability);
      setVehicles((prev) => prev.map((v) => (v._id === data._id ? data : v)));
      toast.success(data.availability ? `${data.model} is now available.` : `${data.model} is now unavailable.`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBusyId(null);
    }
  };

  const removeVehicle = async (vehicle) => {
    setBusyId(vehicle._id);
    try {
      await vehicleApi.remove(vehicle._id);
      setVehicles((prev) => prev.filter((v) => v._id !== vehicle._id));
      toast.success(`${vehicle.model} was removed.`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBusyId(null);
    }
  };

  return { vehicles, loading, busyId, addVehicle, toggleAvailability, removeVehicle };
}
