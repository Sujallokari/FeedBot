import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireRole }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("isAdmin"); // "true" for admin, "false" for user

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
