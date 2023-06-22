import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/navbar/Navbar";
import Router from "./routes/Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./components/FotterComp";
/*toast*/
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


import useLoggedIn from "./hooks/useLoggedIn";

const light = {
  palette: {
    mode: "light",
  },
};
const dark = {
  palette: {
    mode: "dark",
  },
};


  
  

function App() {
  const loggIn = useLoggedIn();
  useEffect(() => {
    loggIn();
  }, []);
    const [darkMode, setDarkMode] = useState(true);
    const changeTheme = () => {
      setDarkMode(!darkMode);
    };
  return (
    <>
      <ThemeProvider theme={darkMode ? createTheme(dark) : createTheme(light)}>
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
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <header>
            <ResponsiveAppBar onThemeChange={changeTheme} darkMode={darkMode} />
          </header>
          <main>
            <Router />
          </main>
          {/* <Footer /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
