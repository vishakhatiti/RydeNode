import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

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
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute roles={["customer"]} />}>
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/request-ride" element={<RequestRide />} />
            <Route path="/ride-history" element={<RideHistory />} />
          </Route>

          <Route element={<ProtectedRoute roles={["driver"]} />}>
            <Route path="/driver" element={<DriverDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={["owner"]} />}>
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/vehicles" element={<VehicleManagement />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
