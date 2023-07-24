import React from "react";
import { cardFormArray } from "../cardForm/ArrayCardInputs";
import { useState, useEffect, forwardRef } from "react";
import { feildValidation } from "../../validation/feildValidation";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";

import LogoDialog from "../LogoDialogs";
import axios from "axios";
import CardComponent from "../cardComp";
import { toast } from "react-toastify";
import {
  Dialog,
  Container,
  DialogContent,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const EditCardDialog = ({
  open,
  onClose,
  cardToEdit,
  setCardToEdit,
  replaceEditedCard,
  img,
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
    <Box component="form">
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} color="error">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Edit Movie
              </Typography>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  ml: 1,
                }}
              >
                <EditIcon />
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 3, mb: 1 }}>
          <DialogContent>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                        value={cardToEdit?.[field.name]}
                        required={field.required}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        autoFocus={index === fieldToFocus}
                        error={
                          cardToEdit && !!formError[cardToEdit._id]?.[field.id]
                        }
                        helperText={
                          (cardToEdit &&
                            formError[cardToEdit._id]?.[field.id]) ||
                          ""
                        }
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={handleSaveCard}
                      // disabled={!formValid}
                      sx={{ mt: 1, mb: { xs: 0, md: 2 } }}
                    >
                      Edit Movie
                    </Button>
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                {/* Place the CardComponent on the right */}

                <CardComponent
                  id={""}
                  description={""}
                  createdYear={cardToEdit.createdYear}
                  img={
                    cardToEdit.url ||
                    "https://cdn.pixabay.com/photo/2013/03/08/05/28/filmstrip-91434_1280.jpg"
                  }
                  title={cardToEdit.title || ""}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Container>
      </Dialog>
    </Box>
  );
};

export default EditCardDialog;
