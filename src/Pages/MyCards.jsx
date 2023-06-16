import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fragment, useEffect, useState, forwardRef } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import CardForm from "../components/cardForm/CreateCard";

// Transition component for the dialog
const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MyCards = () => {
  const [cardsState, setCardsState] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const theme = useTheme();

 


  const handleClickOpen = () => {
    // Open the add card dialog
    setAddDialogOpen(true);
  };

  const handleCloseWithoutAdd = () => {
    // Close the add card dialog without adding a new card
    setAddDialogOpen(false);
  };

  const handleClose = (newCard) => {
    // Close the add card dialog and update the cards state with a new card if provided
    setAddDialogOpen(false);
    setCardsState([...cardsState, newCard ? newCard : ""]);
  };

  return (
    <Fragment>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h1" variant="h2" align="left" sx={{ mt: 2 }}>
          Your Cards
        </Typography>
        <IconButton
          color="inherit"
          size="large"
          sx={{ backgroundColor: theme.palette.error.main }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </IconButton>
      </Container>
 
      <Dialog
        fullScreen
        open={addDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} color="error">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseWithoutAdd}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add card
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <CardForm onClose={handleClose} edit={false} />
        </Container>
      </Dialog>
    </Fragment>
  );
};

export default MyCards;
