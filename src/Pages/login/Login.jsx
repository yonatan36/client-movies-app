import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LinearProgress from "@mui/material/LinearProgress";
import { LoginArray } from "./ArrayLogin";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { feildValidation } from "../../validation/feildValidation";
import { useNavigate } from "react-router-dom";
import RegisterPage from "../registerPage/Register";
import PasswordField from "../../components/PasswordField";

import useLoggedIn from "../../hooks/useLoggedIn";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Login = ({ openLogin, setOpenLogin, avatar }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();
  const loggedIn = useLoggedIn();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: fieldValue }));
    const fieldSchema = LoginArray.find((field) => field.name === name)?.joi;
    if (fieldSchema) {
      const error = feildValidation(fieldSchema, fieldValue, name);
      setFormError((prevFormError) => ({ ...prevFormError, [name]: error }));
    }
  };

  // Validate the entire form
  const validateForm = () => {
    for (const field of LoginArray) {
      if (field.required && (!formData[field.name] || formError[field.name])) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setFormValid(validateForm());
  }, [formData, formError]);

  const getUserInfo = async () => {
    const { data } = await axios.get("/users/userInfo");
    return data.name.firstName;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formValid) {
        toast.info("Please fill in all the required fields correctly.");
        return;
      }

      setIsLoading(true);
      const { data } = await axios.post("/users/login", formData);
      localStorage.setItem("token", data.token);

      setIsLoading(false);

      loggedIn();

      const firstName = await getUserInfo();
      toast.success(`Welcome ${firstName}! Good to see you`);
      navigate(ROUTES.HOME);
      handleClose(true);
    } catch (err) {
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         position: "relative",
  //         display: "inline-block",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         marginTop: "200px",
  //       }}
  //     >
  //       <CircularProgress
  //         color="error"
  //         style={{ position: "absolute", zIndex: 1 }}
  //         size={100}
  //       />
  //       <Avatar
  //         alt={avatar.alt}
  //         src={avatar.url}
  //         sx={{
  //           width: 70,
  //           height: 70,
  //         }}
  //       />
  //     </div>
  //   );
  // }

  const handleFocus = (event) => {
    setFieldToFocus(
      LoginArray.findIndex((field) => field.name === event.target.name)
    );
  };

  const resetForm = () => {
    setFormData({});
    setFormError({});
  };

  const handleClose = () => {
    setOpenLogin(false);
  };

  const handleClick = () => {
    setOpenRegister(true);
  };

  return (
    <React.Fragment>
      <Dialog open={openLogin} onClose={handleClose}>
        <DialogContent>
          {isLoading && <LinearProgress color="error" />}

          <Container maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DialogTitle>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <HowToRegIcon />
                </Avatar>
                Sign up
              </DialogTitle>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {LoginArray.map((field, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={field.sm}
                      key={`${new Date()}-${field.id}`}
                    >
                      {field.component ? (
                        <field.component
                          passwordRef={passwordRef}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                        />
                      ) : (
                        <TextField
                          fullWidth
                          label={field.label}
                          name={field.name}
                          id={field.id}
                          type={field.type}
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          autoFocus={index === fieldToFocus}
                          error={!!formError[field.name]}
                          helperText={formError[field.name] || ""}
                        />
                      )}
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 4 }}
                      color="error"
                    >
                      Sign in
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      onClick={resetForm}
                      color="error"
                    >
                      <RestartAltIcon /> Reset Form
                    </Button>
                  </Grid>
                </Grid>
                {/* Cancel button and Link to login page */}
              </Box>
            </Box>
                
          </Container>
          <RegisterPage
            openRegister={openRegister}
            setOpenRegister={setOpenRegister}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>
            <DialogContentText>Don't have an account?</DialogContentText>
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {openRegister && (
        <RegisterPage
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
        />
      )}
    </React.Fragment>
  );
};

export default Login;
