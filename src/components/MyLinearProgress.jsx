import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

function MyLinearProgress() {
  return (
    <LinearProgress
      color="error"
      sx={{ height: "6px", mt: { xs: 7.5, md: 9.2 } }}
    />
  );
}

export default MyLinearProgress;
