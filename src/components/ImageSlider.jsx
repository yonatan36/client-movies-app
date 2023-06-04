import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import { CardMedia, Container } from "@mui/material";

const ImageSlider = () => {
  const images = [
    { id: 1, src: slide1, alt: "Image 1" },
    { id: 2, src: slide2, alt: "Image 2" },
    { id: 3, src: slide3, alt: "Image 3" },
    { id: 4, src: slide1, alt: "Image 1" },
    { id: 5, src: slide2, alt: "Image 2" },
    { id: 6, src: slide3, alt: "Image 3" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <Container key={image.id}>
          <CardMedia component="img" src={image.src} alt={image.alt} />
        </Container>
      ))}
    </Slider>
  );
};

export default ImageSlider;
