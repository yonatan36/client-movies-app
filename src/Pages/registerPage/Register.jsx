import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Container from "@mui/material/Container";
import { TextField, FormControlLabel, Typography } from "@mui/material";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LinearProgress from "@mui/material/LinearProgress";
import { feildValidation } from "../../validation/feildValidation";
import { registerArray } from "../registerPage/ArrayInputs";
import BizDialog from "../../components/DialogsPopups/BizDialog";
import LogoDialog from "../../components/LogoDialogs";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
  IconButton,
} from "@mui/material";

const RegisterPage = ({ openRegister, setOpenRegister }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openBizDialog, setOpenBizDialog] = useState(false);
  const navigate = useNavigate();

  // Handle input field focus
  const handleFocus = (event) => {
    setFieldToFocus(
      registerArray.findIndex((field) => field.name === event.target.name)
    );
  };

  // Validate the entire form
  const validateForm = () => {
    for (const field of registerArray) {
      if (field.required && (!formData[field.name] || formError[field.name])) {
        return false;
      }
    }
    return true;
  };
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: fieldValue }));

    if (name === "isBusiness") {
      // If the checkbox is checked, open the business dialog
      setOpenBizDialog(checked);
    }

    const fieldSchema = registerArray.find((field) => field.name === name)?.joi;
    if (fieldSchema) {
      const error = feildValidation(fieldSchema, fieldValue, name);
      setFormError((prevFormError) => ({ ...prevFormError, [name]: error }));
    }
  };

  useEffect(() => {
    setFormValid(validateForm());
  }, [formData, formError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formValid) {
        toast.info("Please fill in all the required fields correctly.");
        return;
      }
      setIsLoading(true);
      await axios.post("users/register", formData);
      setIsLoading(false);
      handleClose(false);
      setOpenLogin(true);
      toast.success(`Register success!`);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Oops! Registration failed. Please try again.`);
    }
  };

  // const formValid = Object.keys(formError).length === 0;
  const handleClose = () => setOpenRegister(false);

  const handleBizDialogClose = () => {
    setOpenBizDialog(false);
  };
  return (
    <React.Fragment>
      <Dialog open={openRegister} onClose={handleClose}>
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
                mr: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                fontSize="1.7rem"
                component="div"
              >
                Sign up
              </Typography>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <HowToRegIcon />
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              mb: 6,
            }}
          >
            <LogoDialog />
          </Box>
          <Container maxWidth="md">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                {registerArray.map((field, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={field.sm}
                    key={`${new Date()}-${field.id}`}
                  >
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
                  </Grid>
                ))}
              </Grid>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  onChange={handleChange}
                  name="isBusiness"
                />
              }
              label="Register as a business"
              labelPlacement="end"
              style={{ display: "flex", alignItems: "center" }}
            />
          </Container>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid container justifyContent="center">
              <Grid item xs={10}>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1 }}
                  color="error"
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    setOpenLogin(true);
                    handleClose();
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <BizDialog open={openBizDialog} onClose={handleBizDialogClose} />
      <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </React.Fragment>
  );
};

export default RegisterPage;
