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
import LinearProgress from "@mui/material/LinearProgress";
import { feildValidation } from "../../validation/feildValidation";
import { profileArray } from "../profile/ArrayInputs";
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
  const [inputState, setInputState] = useState({});

  // Handle input field focus
  const handleFocus = (event) => {
    const fieldIndex = profileArray.findIndex(
      (field) => field.name === event.target.name
    );
    setFieldToFocus(fieldIndex >= 0 ? fieldIndex : 0);
  };

  // Validate the entire form
  const validateForm = () => {
    for (const field of profileArray) {
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
    setInputState((prevInputState) => ({
      ...prevInputState,
      [name]: fieldValue,
    }));

    const fieldSchema = profileArray.find((field) => field.name === name)?.joi;
    if (fieldSchema) {
      const error = feildValidation(fieldSchema, fieldValue, name);
      setFormError((prevFormError) => ({ ...prevFormError, [name]: error }));
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/users/userInfo/");
      const firstName =
        data && data.name && data.name.firstName ? data.name.firstName : "";
      const lastName =
        data && data.name && data.name.lastName ? data.name.lastName : "";
      const url = data && data.image && data.image.url ? data.image.url : "";
      const alt = data && data.image && data.image.alt ? data.image.alt : "";
      const state =
        data && data.address && data.address.state ? data.address.state : "";
      const country =
        data && data.address && data.address.country
          ? data.address.country
          : "";
      const city =
        data && data.address && data.address.city ? data.address.city : "";
      const street =
        data && data.address && data.address.street ? data.address.street : "";
      const houseNumber =
        data && data.address && data.address.houseNumber
          ? data.address.houseNumber
          : "";
      const zip =
        data && data.address && data.address.zip ? data.address.zip : "";
      let newInputState = {
        ...data,
        firstName,
        lastName,
        url,
        alt,
        state,
        country,
        city,
        street,
        houseNumber,
        zip,
      };

      delete newInputState.isBusiness;
      delete newInputState.isAdmin;
      delete newInputState.password;

      setInputState(newInputState);
    } catch (err) {
      console.log("error from axios", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFormValid(validateForm());
  }, [formData, formError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    debugger;
    try {
      const { _id, ...requestData } = inputState;
      await axios.put(`/users/${_id}`, requestData);
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
                  {profileArray.map((field, index) => (
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
                        value={inputState[field.name] || ""}
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
