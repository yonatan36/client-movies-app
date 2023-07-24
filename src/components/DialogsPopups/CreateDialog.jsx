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
import CreateIcon from "@mui/icons-material/Create";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LogoDialog from "../LogoDialogs";
import VisibilityIcon from "@mui/icons-material/Visibility";
const CreateDialog = ({ open, onClose, openCreate }) => {
  const handleClick = () => {
    onClose();
    openCreate(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <LogoDialog />
      </Box>
      <DialogTitle sx={{ textAlign: "center" }}>
        Steps to Create Your Movie
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Welcome, Business User! We are thrilled to have you as a part of our
          community, and we can't wait to see the amazing movies you'll bring to
          our website.
        </DialogContentText>

        <DialogContentText>
          As a Business user, you can follow these steps to create your movie:
        </DialogContentText>

        <List>
          <ListItem>
            <ListItemIcon>
              {/* Icon for Step 1: Create Your Movie */}
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Step 1: Create Your Movie"
              secondary="Click on the 'Plus' button to start create your new movie."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {/* Icon for Step 2: Edit Your Movie */}
              <EditIcon />
            </ListItemIcon>
            <ListItemText
              primary="Step 2: Fill in all the fields"
              secondary="It is recommended to put an impressive image."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {/* Icon for Step 4: Preview Your Movie */}
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText
              primary="Step 3: Preview Your Movie"
              secondary="

Before finishing, you can always see how your video is presented to the client."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              {/* Icon for Step 5: Publish Your Movie */}
              <BookmarkAddedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Step 4: Publish Your Movie"
              secondary="Once satisfied, click 'create' to make your movie available for others to enjoy!"
            />
          </ListItem>
        </List>

        <DialogContentText>
          To navigate, access "MyMovies" to see your creations and easily manage
          your movie projects.
        </DialogContentText>

        <DialogContentText>
          Our mission is to empower you with the best movie experiences
          imaginable. We're committed to delivering an unparalleled movie-making
          experience for our Business users.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleClick} variant="contained" color="error">
          lets start
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
