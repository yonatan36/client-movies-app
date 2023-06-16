import React, { useState } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRating from "./StarRatingComp"

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
} from "@mui/material";
import PropTypes from "prop-types";

const CardComponent = ({
  img,
  title,
  description,
  id,
  onDelete,
  canDelete,
}) => {
  const [open, setOpen] = useState(false);

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
        <StarRating />

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
      <CardActions>
        <Button size="small" onClick={handleOpen}>
          Button
        </Button>
        <Button sx={{ marginLeft: "auto" }}>
          <PlayCircleFilledIcon />
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
        <CardMedia height="250" component="img" image={img} />
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
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

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
};

export default CardComponent;