import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // No token — redirect to login
    return <Navigate to="/login" replace />;
  }

  // If role-based protection
  if (role && userRole !== role) {
    alert("⛔ Access Denied!");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
