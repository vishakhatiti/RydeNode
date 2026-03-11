import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-midnight text-white">
      <Navbar />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1">
        <Sidebar />
        <main className="flex-1 px-4 py-6 tablet:px-6 tablet:py-8 desktop:px-10">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
