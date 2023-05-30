import React from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import slide1 from "../../src/assets/home1.jpg";
import slide2 from "../../src/assets/home2.jpg";
import slide3 from "../../src/assets/home3.jpg";
import font from "../../src/assets/texure.jpg";

const useStyles = makeStyles({
  carouselImage: {
    position: "relative",
    width: "100%",
    height: 500,
    objectFit: "cover",
  },
  imageTitle: {
    position: "absolute",
    top: 60,
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
  const classes = useStyles();

  const carouselData = [
    {
      id: 1,
      imageUrl: slide1,
      caption: "Image 1",
      Title: "Nice Image 1",
    },
    {
      id: 2,
      imageUrl: slide2,
      caption: "Image 2",
      Title: "Nice Image 2",
    },
    {
      id: 3,
      imageUrl: slide3,
      caption: "Image 3",
      Title: "Nice Image 3",
    },
  ];

  return (
    <Carousel animation="slide" swipe>
      {carouselData.map((item) => (
        <div key={item.id}>
          <img
            src={item.imageUrl}
            alt={item.caption}
            className={classes.carouselImage}
          />
          <Typography variant="h6" className={classes.imageTitle}>
            {item.Title}
          </Typography>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
