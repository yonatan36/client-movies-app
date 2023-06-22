import { useState, forwardRef } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRating from "./StarRatingComp";
import CardDialog from "../components/DialogsPopups/CardDialog";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton
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
  canEdit,
  onRemoveLikes,
  isLiked,
  likes,
  notConnected,
  isMyCard,
}) => {
  const [open, setOpen] = useState(false);
  const [likeState, setlikesState] = useState(isLiked);
  const [like, setLikes] = useState(likes.length);

  const handleLikeBtnClick = async () => {
    try {
      const response = await axios.patch("/cards/card-likes/" + id);
      const updatedLikes = response.data.likes.length;
      setLikes(updatedLikes);
      setlikesState((prevState) => !prevState);
      onRemoveLikes(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditBtnClick = () => {
    onEdit(id);
  };

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      {isMyCard ? (
        <Typography
          sx={{
            backgroundColor: "red",
            color: "white",
            padding: "2px 6px",
            borderRadius: "5px",
            marginTop: "5px",
            width: "max-content",
            marginX: "auto",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          Your movie!
        </Typography>
      ) : (
        <></>
      )}
      <Box sx={{ ml: 2, mt: 1 }}>
        <StarRating />
      </Box>
      <CardActions>
        <Button size="medium" onClick={handleOpen} style={{ color: "inherit" }}>
          <PlayCircleFilledIcon sx={{ mr: 1 }} /> Play
        </Button>

        {notConnected ? (
          ""
        ) : (
          <IconButton color="primary" onClick={handleLikeBtnClick}>
            <FavoriteIcon
              className="fav"
              sx={likeState ? { color: "red" } : { color: "primary" }}
            />
          </IconButton>
        )}
        {canEdit ? (
          <IconButton onClick={handleEditBtnClick}>
            <EditIcon />
          </IconButton>
        ) : null}
        {canDelete ? (
          <>
            <IconButton  onClick={handleDeleteBtnClick}>
              <DeleteIcon />
            </IconButton>
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
