import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const CardDialog = ({ open, onClose, card , img, title, description}) => {


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/SqSiUVUvVCE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Card>
          <CardMedia component="img" image={img} alt={title} height="200" />
          <CardContent>
            <Typography variant="body1">{description}</Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;
