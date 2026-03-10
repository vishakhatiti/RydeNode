import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import RequestRide from "./pages/RequestRide";
import VehicleManagement from "./pages/VehicleManagement";
import RideHistory from "./pages/RideHistory";

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/request-ride" element={<RequestRide />} />
            <Route path="/vehicles" element={<VehicleManagement />} />
            <Route path="/ride-history" element={<RideHistory />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
