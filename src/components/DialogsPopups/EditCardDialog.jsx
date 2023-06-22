import React from "react";
import { cardFormArray } from "../cardForm/ArrayCardInputs";
import { useState, useEffect } from "react";
import { feildValidation } from "../../validation/feildValidation";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const EditCardDialog = ({ open, onClose, cardToEdit, setCardToEdit }) => {
  // const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [inputState, setInputState] = useState();

  useEffect(() => {
    // Update form validity whenever form data or errors change
    setFormValid(validateForm());
  }, [cardToEdit, formError]);

  // Handle input field focus
  const handleFocus = (event) => {
    setFieldToFocus(
      cardFormArray.findIndex((field) => field.name === event.target.name)
    );
  };

  // Validate the entire form
  const validateForm = () => {
    for (const field of cardFormArray) {
      if (
        field.required &&
        (!cardToEdit?.[field.name] || formError[field.name])
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSaveCard = async () => {
    debugger
    try {
      if (!cardToEdit) {
        console.log("No card to update");
        return;
      }

      const { _id } = cardToEdit;
      const updatedCard = {
        ...cardToEdit,
        image: undefined,
        likes: undefined,
        user_id: undefined,
        bizNumber: undefined,
        createdAt: undefined,
        _id: undefined,
        __v: undefined,
      };

      const { data } = await axios.put(`/cards/${_id}`, updatedCard);
      let newInputState = {
        ...data,
      };
      setInputState(newInputState);
      toast.info("Card updated!");
      onClose(onClose);
    } catch (err) {
      console.log("Error updating card:", err);
    }
  };

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value, id } = event.target;
    const { joi, label } = cardFormArray.find((field) => field.id === id);
    setFormError({
      ...formError,
      [name]: feildValidation(joi, value, label),
    });
    setCardToEdit({
      ...cardToEdit,
      [name]: value,
    });
  };

  // Reset the form
  const resetForm = () => {
    setFieldToFocus(0);
    setFormError({});
    setFormValid(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Card</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {cardFormArray.map((field, index) => (
            <Grid item xs={12} key={`${new Date()}-${field.id}`}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                id={field.id}
                type={field.type}
                value={cardToEdit?.[field.name]}
                required={field.required}
                onChange={handleChange}
                onFocus={handleFocus}
                autoFocus={index === fieldToFocus}
                error={!!formError[field.name]}
                helperText={formError[field.name] || ""}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSaveCard}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCardDialog;
