import React from 'react'
import backgroundFav from "../assets/backroundFav.jpg"
function About() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundFav})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh", // Set minimum height to cover the entire viewport
      }}
    >
      About
    </div>
  );
}

export default About