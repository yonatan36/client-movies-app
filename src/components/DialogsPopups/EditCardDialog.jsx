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

const EditCardDialog = ({
  open,
  onClose,
  cardToEdit,
  setCardToEdit,
  replaceEditedCard,
}) => {
  // const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [inputState, setInputState] = useState();

  useEffect(() => {
    setFormError({});
  }, [open]);
  useEffect(() => {
    // Update form validity whenever form data or errors change
    setFormValid(validateForm());
  }, [cardToEdit, formError, open]);

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
    try {
      if (!formValid) {
        toast.info("Don't piss me off!");
        return;
      }
      const { _id } = cardToEdit;

      const updatedCard = {
        ...cardToEdit,
        image: undefined,
        likes: undefined,
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
      toast.info("movie updated!");
      replaceEditedCard(data.card);
      onClose(onClose);
    } catch (err) {
      console.log("Error updating card:", err);
    }
  };

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value, id } = event.target;
    const { joi, label } = cardFormArray.find((field) => field.id === id);

    setFormError((prevFormError) => ({
      ...prevFormError,
      [cardToEdit._id]: {
        ...prevFormError[cardToEdit._id],
        [id]: feildValidation(joi, value, label),
      },
    }));

    setCardToEdit((prevCardToEdit) => ({
      ...prevCardToEdit,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {cardFormArray.map((field, index) => (
            <Grid item xs={12} sm={field.sm} key={`${new Date()}-${field.id}`}>
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
                error={cardToEdit && !!formError[cardToEdit._id]?.[field.id]}
                helperText={
                  (cardToEdit && formError[cardToEdit._id]?.[field.id]) || ""
                }
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
