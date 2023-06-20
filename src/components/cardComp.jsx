import { useState, forwardRef } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRating from "./StarRatingComp";
import CardDialog from "../components/DialogsPopups/CardDialog";
import EditIcon from "@mui/icons-material/Edit";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

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

          </>
        ) : null}
      </CardActions>

      <CardDialog
        open={open}
        onClose={handleClose}
        img={img}
        title={title}
        description={description}
      />
    </Card>
  );
};

CardComponent.propTypes = {
  img: PropTypes.string.isRequired,
};

export default CardComponent;
