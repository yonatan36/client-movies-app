import React from "react";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useMemo } from "react";

const StarRating = () => {
  const randomStars = useMemo(() => Math.floor(Math.random() * 4) + 2, []);
  const isPopular = randomStars >= 4;
  const Popular = randomStars === 5;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: randomStars }).map((_, index) => (
        <StarIcon
          size="small"
          key={index}
          sx={{ color: isPopular ? "gold" : "white", fontSize: "20px" }}
        />
      ))}
      {Popular && (
        <Typography
          variant="text"
          sx={{ color: "gold", fontWeight: "bold", marginLeft: "5px" }}
        >
          popular!
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;
