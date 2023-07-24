import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { cardFormArray } from "./ArrayCardInputs";
import { feildValidation } from "../../validation/feildValidation";
import { TextField, Grid, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LogoDialog from "../LogoDialogs";
import CardComponent from "../cardComp";

const CardForm = ({}) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Update form validity whenever form data or errors change
    setFormValid(validateForm());
  }, [formData, formError]);

  // Handle input field focus
  const handleFocus = (event) => {
    setFieldToFocus(
      cardFormArray.findIndex((field) => field.name === event.target.name)
    );
  };

  // Validate the entire form
  const validateForm = () => {
    for (const field of cardFormArray) {
      if (field.required && (!formData[field.name] || formError[field.name])) {
        return false;
      }
    }
    return true;
  };

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value, id } = event.target;
    const { joi, label } = cardFormArray.find((field) => field.id === id);
    setFormError({
      ...formError,
      [name]: feildValidation(joi, value, label),
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset the form
  const resetForm = () => {
    setFormData({});
    setFieldToFocus(0);
    setFormError({});
    setFormValid(false);
  };

  const createCard = async (event) => {
    event.preventDefault();

    if (!formValid) {
      toast.info("Please fill in all required fields correctly.");
      return;
    }
    try {
      await axios.post("/cards", formData);
      navigate(ROUTES.HOME);
      toast.success("movie created!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Box component={"form"} onSubmit={createCard}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <LogoDialog />
        <Grid item xs={12} sm={6}>
          {/* Place the form on the left */}

          <Grid container spacing={2}>
            {cardFormArray.map((field, index) => (
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
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                // disabled={!formValid}
              >
                Create Movie
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={resetForm}
              >
                <RestartAltIcon /> Reset Form
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          {/* Place the CardComponent on the right */}

          <CardComponent
            id={""}
            description={""}
            createdYear={formData.createdYear}
            title={formData.title || ""}
            img={
              formData.url ||
              "https://cdn.pixabay.com/photo/2013/03/08/05/28/filmstrip-91434_1280.jpg"
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardForm;
