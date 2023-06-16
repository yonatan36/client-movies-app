import React from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
function DeleteDialog() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cardsArr, setCardArr] = useState(null);

  //open the popup
  const handleDeleteFromInitialCardsArr = async (id) => {
    setCardToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCard = async () => {
    try {
      setCardArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== cardToDelete)
      );
      setIsDeleteDialogOpen(false);
      toast.success("Deletion was successful");
      await axios.delete("/cards/" + cardToDelete);
    } catch (err) {
      console.log("error delate", err.response.data);
    }
  };
  return (
    <>
      <Dialog
        onDelete={handleDeleteFromInitialCardsArr}
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
        <DialogContent>
          Deleting a card is permanent and cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteCard} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteDialog;
