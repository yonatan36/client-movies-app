import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import { LoginArray } from "./ArrayLogin";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { feildValidation } from "../../validation/feildValidation";
import { useNavigate } from "react-router-dom";
import RegisterPage from "../registerPage/Register";
import PasswordField from "../../components/PasswordField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useLoggedIn from "../../hooks/useLoggedIn";
import CloseIcon from "@mui/icons-material/Close";
import LogoDialog from "../../components/LogoDialogs";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";

const Login = ({ openLogin, setOpenLogin }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const passwordRef = useRef();

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
      toast.error("Invalid email or password");
    }
  };

  const handleFocus = (event) => {
    setFieldToFocus(
      LoginArray.findIndex((field) => field.name === event.target.name)
    );
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
        <AppBar position="relative" color="error">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2.5,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                fontSize="1.7rem"
                component="div"
              >
                Sign In
              </Typography>
              <Avatar
                sx={{
                  ml: 1,
                  bgcolor: "secondary.main",
                }}
              >
                <LoginIcon />
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 4 }}>
          <LogoDialog />
        </Box>
        <DialogContent>
          <Container maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                      variant="outlined"
                      onClick={handleClick}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
                {/* Cancel button and Link to login page */}
              </Box>
            </Box>
                
          </Container>
        </DialogContent>
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
