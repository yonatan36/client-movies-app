import React from "react";
import CarouselComponent from "../components/Carousel";
import ImageSlider from "../components/ImageSlider";
import CardComponent from "../components/cardComp";
import { Box, Grid, Container, CardMedia } from "@mui/material";
import  { useState } from "react";


const initalCardArr = [
  {
    id: 1,
    img: "https://picsum.photos/200/300",
    title: "id 1",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim nisl iaculis. Quisque malesuada, lorem eget congue venenatis, mi enim luctus odio, vel finibus leo libero eu risus. Maecenas posuere risus et nibh feugiat, vitae pulvinar justo pharetra. In eu neque ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddlacus. Aliquam blandit mauris in commodo fringilla.",
  },

  {
    id: 2,
    img: "https://picsum.photos/200/300",
    title: "id 2",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim ",
  },
  {
    id: 3,

    title: "id 3",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim ",
  },
  {
    id: 4,
    img: "https://picsum.photos/200/300",
    title: "id 4",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim ",
  },
];
function Home() {
 const [cardsArr,setCardArr] = useState(initalCardArr)
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
                <CardComponent {...item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    
    </>
  );
}

export default Home;






