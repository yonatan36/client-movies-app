import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import slide1 from "../../src/assets/slide1.png"
import slide2 from "../../src/assets/slide2.jpg"
import slide3 from "../../src/assets/slide3.jpg"


const useStyles = makeStyles({
  carousel: {

  },
  carouselImage: {
    width: "100%",
    height: 500,
    objectFit: "cover",
  },
});

const CarouselComponent = () => {
  const classes = useStyles();

  // Demo data for carousel images
  const carouselData = [
    {
      id: 1,
      imageUrl: slide1,
      caption: "Image 1",
    },
    {
      id: 2,
      imageUrl: slide2,
      caption: "Image 2",
    },
    {
      id: 3,
      imageUrl: slide3,
      caption: "Image 3",
    },
  ];

  return (
    <Carousel className={classes.carousel} animation="slide">
      {carouselData.map((item) => (
        <div key={item.id}>
          <img
            src={item.imageUrl}
            alt={item.caption}
            className={classes.carouselImage}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
