import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { ROLE_HOME } from "../contexts/AuthContext";

function ProtectedRoute({ roles }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) {
    return <p className="py-20 text-center text-gray-400">Loading your session…</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
