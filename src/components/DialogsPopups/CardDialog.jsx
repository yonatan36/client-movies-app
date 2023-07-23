import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  Dialog,
  DialogContent,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const CardDialog = ({ open, onClose, img, title, description }) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar position="relative" sx={{ backgroundColor: "red" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "bold",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

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
    </Dialog>
  );
};

export default CardDialog;
