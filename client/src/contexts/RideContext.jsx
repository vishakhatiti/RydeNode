import React, { createContext, useMemo, useState } from "react";
import { rideApi } from "../services/api";

export const RideContext = createContext(null);

export function RideProvider({ children }) {
  const [rides, setRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);

  const fetchMyRides = async () => {
    const { data } = await rideApi.myRides();
    setRides(data);
    return data;
  };

  const requestRide = async (payload) => {
    const { data } = await rideApi.requestRide(payload);
    setActiveRide(data);
    return data;
  };

  const value = useMemo(
    () => ({ rides, activeRide, fetchMyRides, requestRide, setActiveRide }),
    [rides, activeRide]
  );

  return <RideContext.Provider value={value}>{children}</RideContext.Provider>;
}
