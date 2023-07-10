import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Grid, Button, Box } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { cardFormArray } from "./ArrayCardInputs";
import { feildValidation } from "../../validation/feildValidation";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CardForm = () => {
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
      <Grid container spacing={2}>
        {cardFormArray.map((field, index) => (
          <Grid item xs={12} sm={field.sm} key={`${new Date()}-${field.id}`}>
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
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            // disabled={!formValid}
            sx={{ mt: 1, mb: { xs: 0, md: 2 } }}
          >
            Save Card
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mb: 1, mt: { xs: 0, md: 2 } }}
            onClick={resetForm}
          >
            <RestartAltIcon /> Reset Form
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardForm;
