import React from "react";
import { Container, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

function Logo() {
  const theme = useTheme();

  return (
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
        Yoon
        <span style={{ color: theme.palette.error.main }}>Flix</span>
      </Typography>
    </Container>
  );
}

export default Logo;
