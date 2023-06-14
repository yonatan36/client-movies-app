import React, { useEffect } from "react";
import CarouselComponent from "../components/Carousel";
import ImageSlider from "../components/ImageSlider";
import CardComponent from "../components/cardComp";
import { Box, Grid, Container, CardMedia } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";

function Home() {
  const [cardsArr, setCardArr] = useState(null);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setCardArr(data);
      })
      .catch((err) => console.log(err));
  }, []);
if (!cardsArr) {
  return <CircularProgress />;
}
  return (
    <>
      <Box>
        <CarouselComponent />

        <Container maxWidth="" sx={{ my: 2, display: "flex" }}>
          <Grid
            container
            spacing={3}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {cardsArr.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.id + Date.now()}
              >
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subTitle={item.subTitle}
                  phone={item.phone}
                  address={
                    item.country +
                    ", " +
                    item.city +
                    ", " +
                    item.street +
                    " " +
                    item.houseNumber
                  }
                  img={item.image ? item.image.url : ""}
                  description={item.description}
                  email={item.email}
                  createdAt={item.createdAt}
                  likes={item.likes}
                  bizNumber={item.bizNumber}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Home;
