import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

// Lazy loading components
// const Home = lazy(() => import("../pages/Home"));
// // const Login = lazy(() => import("../pages/Login"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Register = lazy(() => import("../pages/Register"));
// const NotFound = lazy(() => import("./pages/NotFound"));

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Fallback Route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};
