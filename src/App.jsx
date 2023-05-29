import React from "react";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/Navbar";
import Router from "./routes/Router";
function App() {
  return (
    <div>
      <header>
        <ResponsiveAppBar />
      </header>
      <main>
        <Router />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
