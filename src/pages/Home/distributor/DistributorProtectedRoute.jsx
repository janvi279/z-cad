import React from "react";
import { Navigate } from "react-router-dom";

const DistributorProtectedRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "distributorToken"
    );

  if (!token) {
    return (
      <Navigate
        to="/distributor/login"
      />
    );
  }

  return children;
};

export default DistributorProtectedRoute;