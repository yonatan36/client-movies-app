import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

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
    // If authenticated, render the protected component
    return element;
  } else {
    // If not authenticated, redirect to the "About" page
    toast.error("Oops! plese loogin.");
    return <Navigate to={ROUTES.ABOUT} />;
  }
};

export default ProtectedRoute;
