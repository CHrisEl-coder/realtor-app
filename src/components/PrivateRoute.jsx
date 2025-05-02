import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loader />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-up" />;
};

export default PrivateRoute;
