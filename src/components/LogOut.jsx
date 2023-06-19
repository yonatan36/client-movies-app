import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import axios from "axios";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  let logoutInProgress = false; // Add this flag to track logout process

  const handleLogout = async () => {
    if (logoutInProgress) {
      return; // Exit the function if logout is already in progress
    }
    try {
      logoutInProgress = true; // Set the flag to indicate logout process started
      const response = await axios.get("/users/userInfo");
      const firstName = response.data.name.firstName;
      localStorage.clear();
      dispatch(authActions.logout());
      navigate(ROUTES.ABOUT);
      toast.success(`Goodbye ${firstName}! We hope to see you again soon.`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      logoutInProgress = false; // Reset the flag after logout process completes
    }
  };

  return <div>{/* Render any UI or component related to LogOut */}</div>;
};

export default LogOut;
