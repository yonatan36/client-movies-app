import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoDialog from "../LogoDialogs";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BusinessCapabilitiesDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <LogoDialog />
      </Box>
      <DialogTitle sx={{ textAlign: "center" }}>
        Welcome, Business User!
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          We are thrilled to have you as a part of our community, and we can't
          wait to see the amazing movies you'll bring to our website.
        </DialogContentText>

        <DialogContentText>
          As a Business user, you unlock a world of exclusive capabilities to
          make your movie journey extraordinary:
        </DialogContentText>

        <List>
          <ListItem>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create Your Movies"
              secondary="Bring your imagination to life and create stunning movies with our user-friendly movie creation tool. It's as easy as 1-2-3!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText
              primary="Edit with Ease"
              secondary="Edit your movies like a pro! Make your movies shine with powerful editing tools."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText
              primary="Effortless Deletion"
              secondary="Made a mistake? Don't worry! Deleting your movie is just a click away."
            />
          </ListItem>
          {/* Add more capabilities here */}
        </List>

        <DialogContentText>
          To the navigation, MyMovies will be added where you can create your
          new movies, and you can easily see all the movies you've created.
        </DialogContentText>

        <DialogContentText>
          Our mission is to empower you with the best movie experiences
          imaginable. We're committed to delivering an unparalleled movie-making
          experience for our Business users.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BusinessCapabilitiesDialog;
