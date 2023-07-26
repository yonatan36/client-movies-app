import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import StarRating from "./StarRatingComp";
import { Box, Button, Grid, CardContent } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    position: "absolute",
    top: 400,
    left: 50,
    [theme.breakpoints.down("sm")]: {
      left: 40,
      top: 415,
    },
  },
  // Additional styles for the buttons
  button: {
    fontWeight: "bold",
    padding: "16px 40px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      fontWeight: "normal",
      padding: "10px 20px",
      fontWeight: "bold",
    },
  },
  playButton: {
    backgroundColor: "#e50914",
    color: "#fff",
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#b6070c",
    },
  },
  errorButton: {
    backgroundColor: "#333",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#111",
    },
  },
  carouselImage: {
    position: "relative",
    width: "100%",
    height: 560,
    objectFit: "cover",
    animation: "$foggyEffect 1s ease-in forwards",
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
      top: 90,
      left: 30,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
      top: 90,
      left: 35,
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
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      top: 220,
    },
  },
  StarRating: {
    position: "absolute",
    top: 340,
    left: 60,
    [theme.breakpoints.down("sm")]: {
      top: 180,
      left: 40,
    },
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
          <Grid item xs={12} md={6} key={index}>
            <img src={item.image.url} className={classes.carouselImage} />

            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
              >
                <Grid item>
                  <Box className={classes.StarRating}>
                    <StarRating />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.description}>
                    {item.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.imageTitle}>
                    {item.title}
                  </Typography>
                </Grid>

                <Grid container spacing={2} className={classes.buttonContainer}>
                  <Grid item xs={4} sm={3} md={2} lg={2}>
                    <Button
                      variant="contained"
                      className={`${classes.button} ${classes.playButton}`}
                      startIcon={<PlayCircleIcon />}
                      fullWidth
                    >
                      Play
                    </Button>
                  </Grid>
                  <Grid item xs={4} sm={3} md={2} lg={2}>
                    <Button
                      variant="contained"
                      className={`${classes.button} ${classes.errorButton}`}
                      startIcon={<ErrorIcon />}
                      fullWidth
                    >
                      info
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
