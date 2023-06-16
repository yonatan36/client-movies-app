import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import font from "../../src/assets/texure.jpg";
import { Box } from "@mui/material";
import axios from "axios";

const useStyles = makeStyles({
  carouselImage: {
    position: "relative",
    width: "100%",
    height: 460,
    objectFit: "cover",
  },
  imageTitle: {
    position: "absolute",
    top: 15,
    left: 80,
    fontSize: 90,
    fontWeight: "800",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    backgroundImage: `url(${font})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitFontSmoothing: "antialiased",
  },
});

const CarouselComponent = () => {
  const [cardsArr, setCardArr] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCardArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Carousel animation="slide" swipe>
      {cardsArr &&
        cardsArr.map((item, index) => (
          <Box key={index}>
            <img src={item.image.url} className={classes.carouselImage} />
            <h1 className={classes.imageTitle}>{item.title}</h1>
          </Box>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
