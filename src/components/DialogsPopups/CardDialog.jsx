import Slide from "@mui/material/Slide";
import { forwardRef } from "react";

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
const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const CardDialog = ({ open, onClose, card, img, title, description }) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle variant="h4" sx={{ textAlign: "center", fontWeight: 100 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <div style={{ position: "relative", paddingTop: "56.25%", height: 0 }}>
          <iframe
            src="https://www.youtube.com/embed/SqSiUVUvVCE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
        <Card>
          <CardMedia
            sx={{ width: "600px", height: "300px" }}
            component="img"
            image={img}
            alt={title}
          />
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
