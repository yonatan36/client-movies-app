import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { feildValidation } from "../../validation/feildValidation";
import { profileArray } from "../profile/ArrayInputs";
import LogoDialog from "../../components/LogoDialogs";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const Profile = ({ openProfile, setOpenProfile, avatar, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputState, setInputState] = useState({});

  const { isLoggedIn } = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice
  );
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
    if (isLoggedIn) {
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
          data && data.address && data.address.street
            ? data.address.street
            : "";
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
      } catch (err) {}
    }
  };
  useEffect(() => {
    fetchData();
    setFormError({});
  }, [openProfile]);

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
      const { _id } = inputState;

      const updatedCard = {
        ...inputState,
        image: undefined,
        name: undefined,
        _id: undefined,
        address: undefined,
      };

      await axios.put(`/users/${_id}`, updatedCard);
      setIsLoading(false);
      handleClose(false);
      onUpdate(inputState.url, inputState.alt, inputState.firstName);

      const firstName = await getUserInfo();
      toast.success(`Update successful! Hello, ${firstName}!`);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Oops! update failed. Please try again.`);
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
                mr: 3,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="400"
                fontSize="1.7rem"
                component="div"
              >
                profile
              </Typography>
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
            }}
          >
            <LogoDialog />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Avatar
              alt={avatar.alt}
              src={avatar.url}
              sx={{ width: 70, height: 70 }}
            />
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
                        error={!!formError[field.name]}
                        helperText={formError[field.name] || ""}
                      />
                    </Grid>
                  ))}
                </Grid>
                {/* Cancel button and Link to login page */}
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
            </Box>
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
                  sx={{ mt: 1 }}
                  color="error"
                >
                  update me
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 1, mt: 1 }}
                  onClick={handleClose}
                >
                  cancal
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Profile;
