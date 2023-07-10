import React from "react";
import AccordionComp from "../components/AccordionComp";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Home from "../assets/home.jpg";
import about from "../assets/about.jpg";
import register from "../assets/register.jpg";
import backgroundFav from "../assets/backroundFav.jpg";

function About() {
  return (
    <div>
      <CardMedia
        component="img"
        alt="Background"
        image={backgroundFav}
        height="550"
      />
      <Typography
        variant="h5"
        component="h2"
        className="image-title"
        style={{
          position: "absolute",
          top: "8.5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#ffffff",
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        Unlimited movies, TV shows, and more
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        className="image-title"
        style={{
          position: "absolute",
          top: "14.5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#ffffff",
          fontSize: "1.1rem",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        Watch anywhere. Cancel at any time. Ready to watch? Register now and
        start enjoying thousands of movies.
      </Typography>
      <Container>
        <Grid container spacing={6} mt={2} alignItems="center">
          <Grid item xs={12}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Excitement
                    </Typography>
                    <Typography variant="body1" component="p">
                      We are glad you chose to use our streaming platform. Our
                      platform provides you with a useful and efficient way to
                      watch movies or series in the most convenient way. With
                      our advanced features, you can watch professional-looking
                      movies that leave a lasting impression.
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardMedia component="img" alt="Screenshot" image={Home} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    alt="Screenshot"
                    image={register}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Register and Explore
                    </Typography>
                    <Typography variant="body1" component="p">
                      To fully enjoy the variety of options on our platform, we
                      invites you to register as a user. Whether you are a
                      Private person or business, the registration will open a
                      lock number Benefits and features tailored to your needs.
                      If you are a Business, be sure to register as a business
                      user to earn Access to tools for advertising and managing
                      the business Your business videos. Join our community of
                      users and Discover the endless possibilities to promote
                      and grow your business.
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      Favorite Movies
                    </Typography>
                    <Typography variant="body1" component="p">
                      We believe in personalization and convenience. As a user
                      on our platform, you have the option to mark videos as
                      favorites. This allows you to easily access and refer back
                      to the videos that catch your interest. , marking movies
                      as favorites ensures they are just a click away. Stay
                      organized and never lose track of the movies that matter
                      most to you.
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardMedia component="img" alt="Screenshot" image={about} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <AccordionComp />
      </Container>
    </div>
  );
}

export default About;
