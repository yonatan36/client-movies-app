import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import StarRating from "./StarRatingComp";
import { Box, Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  carouselImage: {
    position: "relative",
    width: "100%",
    height: 560,
    objectFit: "cover",
    animation: "$foggyEffect 1s ease-in forwards",
  },
  "@keyframes foggyEffect": {
    "0%": {
      filter: "blur(10px)",
      opacity: 0,
    },
    "50%": {
      filter: "blur(5px)",
      opacity: 0.5,
    },
    "100%": {
      filter: "blur(0)",
      opacity: 1,
    },
  },
  imageTitle: {
    position: "absolute",
    top: 150,
    left: 50,
    fontSize: 100,
    fontWeight: 800,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: 50,
      top: 120,
      left: 30,
    },
  },
  description: {
    position: "absolute",
    color: "white",
    top: 280,
    left: 60,
    [theme.breakpoints.down("sm")]: {
      top: 285,
      left: 40,
    },
  },
  StarRating: {
    position: "absolute",
    top: 340,
    left: 60,
    [theme.breakpoints.down("sm")]: {
      top: 260,
      left: 40,
    },
  },
}));

const CarouselComponent = () => {
  const [cardsArr, setCardArr] = useState(null);
  const [description, setDescrption] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCardArr(data);
        setDescrption(data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Carousel animation="slide" swipe>
      {cardsArr &&
        cardsArr.map((item, index) => (
          <Box key={index}>
            <img src={item.image.url} className={classes.carouselImage} />
            <Box className={classes.StarRating}>
              <StarRating />
            </Box>
            <Typography variant="h6" className={classes.description}>
              {item.description}
            </Typography>
            <Typography className={classes.imageTitle}>{item.title}</Typography>
            <Button
              variant="contained"
              color="error"
              sx={{
                position: "absolute",
                top: 400,
                left: { xs: 30, md: 50 },
              }}
            >
              <PlayCircleIcon
                sx={{
                  display: { xs: "block", lg: "flex" },
                  fontSize: { xs: "30px", lg: "40px" },
                  marginRight: "12px",
                  marginLeft: "5px",
                }}
              />
              Play
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                position: "absolute",
                backgroundColor: "grey",
                "&:hover": {
                  backgroundColor: "grey",
                },
                top: 400,
                left: { xs: 160, md: 190 },
              }}
            >
              <ErrorIcon
                sx={{
                  display: { xs: "block", lg: "flex" },
                  fontSize: { xs: "30px", lg: "40px" },
                  marginRight: "7px",
                }}
              />
              More info
            </Button>
          </Box>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
