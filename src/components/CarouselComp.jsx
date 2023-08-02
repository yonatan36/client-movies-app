import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import StarRating from "./StarRatingComp";
import { Box, Button, Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import axios from "axios";

const CarouselComponent = () => {
  const [cardsArr, setCardArr] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCardArr(data);
        setDescription(data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Carousel animation="slide" swipe>
      {cardsArr &&
        cardsArr.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <img
              alt="carousel nice"
              src={item.image.url}
              style={{
                position: "relative",
                width: "100%",
                height: 560,
                objectFit: "cover",
                animation: "foggyEffect 1s ease-in forwards",
              }}
            />

            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
              >
                <Grid item>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 340,
                      left: 60,
                      "@media (max-width: 600px)": {
                        top: 180,
                        left: 40,
                      },
                    }}
                  >
                    <StarRating />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{
                      position: "absolute",
                      color: "white",
                      top: 280,
                      left: 60,
                      "@media (max-width: 600px)": {
                        top: 285,
                        left: 40,
                      },
                    }}
                  >
                    {item.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      position: "absolute",
                      top: 150,
                      left: 50,
                      fontSize: 100,
                      fontWeight: 800,
                      color: "white",
                      "@media (max-width: 600px)": {
                        fontSize: 50,
                        top: 90,
                        left: 30,
                      },
                      "@media (max-width: 400px)": {
                        fontSize: 30,
                        top: 90,
                        left: 35,
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  sx={{
                    position: "absolute",
                    top: 400,
                    left: 50,
                    "@media (max-width: 600px)": {
                      left: 40,
                      top: 415,
                    },
                  }}
                >
                  <Grid item xs={4} sm={3} md={2} lg={2}>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: "bold",
                        padding: "16px 40px",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                          backgroundColor: "#b6070c", // Moved inside '&:hover'
                        },
                        "@media (max-width: 600px)": {
                          fontWeight: "normal",
                          padding: "10px 20px",
                        },
                        backgroundColor: "#e50914",
                        color: "#fff",
                        marginRight: 10,
                      }}
                      startIcon={<PlayCircleIcon />}
                      fullWidth
                    >
                      Play
                    </Button>
                  </Grid>
                  <Grid item xs={4} sm={3} md={2} lg={2}>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: "bold",
                        padding: "16px 40px",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
                          backgroundColor: "#111", // Moved inside '&:hover'
                        },
                        "@media (max-width: 600px)": {
                          fontWeight: "normal",
                          padding: "10px 20px",
                        },
                        backgroundColor: "#333",
                        color: "#fff",
                      }}
                      startIcon={<ErrorIcon />}
                      fullWidth
                    >
                      Info
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
