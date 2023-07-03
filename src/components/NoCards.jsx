import React from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
function NoCards() {
  return (
    <div>
      {" "}
      <Container>
        {" "}
        <Typography
          fontWeight="900"
          fontSize="3rem"
          sx={{
            mr: 2.4,
            ml: 0.6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          opess No cards find, maby check the server
        </Typography>
      </Container>
    </div>
  );
}

export default NoCards;
