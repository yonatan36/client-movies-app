import React from "react";
import { Container, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

function LogoDialog() {
  const theme = useTheme();

  return (
    <Container>
      {" "}
      <Typography
        fontWeight="600"
        fontSize="1.9rem"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Yoon
        <span style={{ color: theme.palette.error.main }}>Flix</span>
      </Typography>
    </Container>
  );
}

export default LogoDialog;
