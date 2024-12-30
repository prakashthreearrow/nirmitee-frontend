import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  let isAuthenticated = useSelector((state) => state?.GetUserDetail?.userDetail);

  // return isAuthenticated ? children : <Navigate to="/login" />;
  return isAuthenticated?.meta?.code ===200 ? children : <Navigate to="/" />;
};