import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const BusinessCapabilitiesDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Welcome, Business User!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We are thrilled to have you as a part of our community, and we can't
          wait to see the amazing movies you'll bring to are website.
        </DialogContentText>

        <DialogContentText>
          As a Business user, you unlock a world of exclusive capabilities to
          make your movie journey extraordinary:
        </DialogContentText>

        <ul>
          <li>
            Create Your Movies: Bring your imagination to life and create
            stunning movies with our user-friendly movie creation tool. It's as
            easy as 1-2-3!
          </li>
          <li>
            Edit with Ease: Edit your movies like a pro! Make your Movies shine
            with powerful editing tools.
          </li>
          <li>
            Effortless Deletion: Made a mistake? Don't worry! Deleting your
            movie is just a click away.
          </li>
          {/* Add more capabilities here */}
        </ul>

        <DialogContentText>
          to the nav will be added MyMovies there you create your new movies,
          and you see in ease all your movies created by you.
        </DialogContentText>
        <DialogContentText>
          Our mission is to empower you with the best movie experiences
          imaginable. We're committed to delivering an unparalleled movie-making
          experience for our Business users.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BusinessCapabilitiesDialog;
