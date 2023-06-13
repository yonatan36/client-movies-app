import React from "react";
import { Container, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/navbar/Navbar";
import Router from "./routes/Router";

/*toast*/
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container
        maxWidth={false}
        disableGutters
        style={{ height: "100vh", position: "relative" }}
      >
        <header>
          <ResponsiveAppBar />
        </header>
        <main>
          <Router />
        </main>
        <footer></footer>
      </Container>
    </>
  );
}

export default App;
