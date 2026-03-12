import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <Navbar />
      <motion.main
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}

export default DashboardLayout;
