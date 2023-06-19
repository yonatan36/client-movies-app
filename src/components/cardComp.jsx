import {  useState, forwardRef } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRating from "./StarRatingComp";

import EditIcon from "@mui/icons-material/Edit";
import Toolbar from "@mui/material/Toolbar";
import { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import Slide from "@mui/material/Slide";

import PropTypes from "prop-types";

// Transition component for the dialog
const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const CardComponent = ({
  img,
  title,
  description,
  id,
  onDelete,
  canDelete,
  onEdit,
 
}) => {
  const [open, setOpen] = useState(false);
  const [cardsState, setCardsState] = useState(null);

  const theme = useTheme();


  const handleClickOpen = () => {
    onEdit(id);
   
  };



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };

  return (
    <Card square raised>
      <CardActionArea onClick={handleOpen}>
        <CardMedia height="250" component="img" image={img} />

        <CardHeader
          title={title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "#fff",
            padding: "8px",
            zIndex: 1,
          }}
        />
      </CardActionArea>
      <Box sx={{ ml: 2, mt: 1 }}>
        <StarRating />
      </Box>
      <CardActions>
        <Button size="medium" onClick={handleOpen} style={{ color: "inherit" }}>
          <PlayCircleFilledIcon sx={{ mr: 1 }} /> Play
        </Button>
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
        {canDelete ? (
          <>
            <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
              <DeleteIcon />
            </Button>

            {/* Display random number of stars */}
          </>
        ) : null}
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
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
          <DialogContentText>{description}</DialogContentText>
          <CardActionArea>
            <CardMedia height="250" component="img" image={img} />
          </CardActionArea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  
    </Card>
  );
};

CardComponent.propTypes = {
  img: PropTypes.string.isRequired,
};

export default CardComponent;
