import React from "react";
import backgroundFav from "../assets/backroundFav.jpg";
import AccordionComp from "../components/AccordionComp";

function About() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundFav})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh", // Set minimum height to cover the entire viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AccordionComp />
    </div>
  );
}

export default About;
