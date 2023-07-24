import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin, isBusiness }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);

  useEffect(() => {
    const checkAuthenticationAsync = async () => {
      try {
        // After the async check is complete, set the loading state to false
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false); // Ensure loading state is set to false even in case of errors
      }
    };

    // Call the async function to check authentication
    checkAuthenticationAsync();
  }, [isLoggedIn]);

  if (isLoading) {
    // Show a loading indicator or a fallback component while checking authentication
    return <div>Loading...</div>;
  } else if (isLoggedIn) {
    if (
      (isAdmin && payload && payload.isAdmin) ||
      (isBusiness && payload && payload.isBusiness)
    ) {
      return element;
    } else {
      toast.error("Oops! You do not have the necessary permissions.");
      return <Navigate to={ROUTES.ABOUT} />;
    }
  } else {
    toast.error("Oops! plese loogin.");
    return <Navigate to={ROUTES.ABOUT} />;
  }
};

export default SuperProtectedRoute;
