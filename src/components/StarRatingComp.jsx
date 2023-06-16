import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useMemo } from "react";
const StarRating = () => {
const randomStars = useMemo(() => Math.floor(Math.random() * 4) + 2, []);
  return (
    <div className="star-rating">
      {Array.from({ length: randomStars }).map((_, index) => (
        <StarIcon
          key={index}
          sx={{ color: randomStars >= 4 ? "gold" : "inherit" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
