import React from "react";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.ABOUT} />;
  } else {
    return element;
  }
};

export default ProtectedRoute;
