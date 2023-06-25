import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import { feildValidation } from "../validation/feildValidation";
import { registerArray } from "./registerPage/ArrayInputs";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Profile = ({ openProfile, setOpenProfile }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        toast.info("Don't piss me off!");
        return;
      }

      setIsLoading(true);

      const result = await axios.post("users/register", formData);

      setIsLoading(false);
      handleClose(false);

      toast.success(`Register success!`);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Oops! Registration failed. Please try again.`);
      console.log("Register error:", err);
    }
  };

  const resetForm = () => {
    setFormData({});
    setFormError({});
  };

  // const formValid = Object.keys(formError).length === 0;
  const handleClose = () => setOpenProfile(false);

  return (
    <React.Fragment>
      <Dialog open={openProfile} onClose={handleClose}>
        <DialogContent>
          <Container maxWidth="md">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <HowToRegIcon />
              </Avatar>
              <DialogTitle>
                profile
                {isLoading && <LinearProgress color="error" />}
              </DialogTitle>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
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
                      />
                      <Typography color="red" fontSize="8pt">
                        {formError[field.name] || ""}
                      </Typography>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: { xs: 0, md: 1 } }}
                      color="error"
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mb: 1, mt: { xs: 0, md: 2 } }}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Profile;
