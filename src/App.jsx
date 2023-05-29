import React from "react";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/Navbar";
import Router from "./routes/Router";
function App() {
  return (
    <Container>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        <Router />
      </main>
      <footer></footer>
    </Container>
  );
}

export default App;