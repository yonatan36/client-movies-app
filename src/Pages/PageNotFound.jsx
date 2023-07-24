import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // You can use react-router-dom if you are using it in your project.

const PageNotFound = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{ textAlign: "center", paddingTop: "50px", mt: 5 }}
    >
      <Typography variant="h1" color="error" sx={{ fontSize: "150px" }}>
        404
      </Typography>
      <Typography variant="h4" color="textSecondary">
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ marginTop: "20px" }}
      >
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="error"
        sx={{ marginTop: "30px" }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default PageNotFound;
