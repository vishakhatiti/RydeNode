import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestRide from "./pages/RequestRide";
import AddVehicle from "./pages/AddVehicle";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request-ride" element={<RequestRide />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;