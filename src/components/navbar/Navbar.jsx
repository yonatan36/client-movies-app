import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import Login from "../../Pages/login/Login";
import RegisterPage from "../../Pages/registerPage/Register";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
const settings = [
  {
    label: "Profile",
  },
  {
    label: "LOGOUT",
    url: ROUTES.LOGOUT,
  },
];

const ResponsiveAppBar = ({ darkMode, onThemeChange, name }) => {
  const notAuthPages = [
    {
      label: "Login",
      url: () => setOpenLogin(true),
    },
    {
      label: "Register",
      url: () => setOpenRegister(true),
    },
  ];
  const authedPages = [
    {
      label: "Fav cards",
      url: ROUTES.FAV,
    },
  ];

  const { isLoggedIn } = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice
  );
  const { payload } = useSelector((bigPieBigState) => bigPieBigState.authSlice);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#212121", boxShadow: "none" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              YOFIX
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
                {/* hamburger with menu */}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={"miniLinks" + page.url}
                    onClick={handleCloseNavMenu}
                  >
                    <NavLinkComponent url={page.url} label={page.label} />
                  </MenuItem>
                ))}
                {isLoggedIn
                  ? ""
                  : notAuthPages.map((page) => (
                      <NavLinkComponent key={page.url} {...page} />
                    ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              YOFIX
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
            </Box>
            <IconButton
              color="inherit"
              onClick={onThemeChange}
              sx={{ ml: 1, mr: 1 }}
            >
              {darkMode ? <BedtimeIcon /> : <WbSunnyIcon />}
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {" "}
              {isLoggedIn
                ? ""
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))}
            </Box>

            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0, ml: 1, mr: 1.5 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography
                    variant="button"
                    sx={{
                      display: "block",
                      paddingX: "0.3rem",
                      textAlign: "center",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    color={"white"}
                  >
                    Hi {name}!
                  </Typography>
                  {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" sx={{ fontSize: "1rem" }}>
                        <NavLink
                          key={setting.url}
                          to={setting.url}
                          style={{ color: darkMode ? "#e8f5e9" : "#212121" }}
                        >
                          {setting.label}
                        </NavLink>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              ""
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <RegisterPage
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />
      <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
    </>
  );
};
export default ResponsiveAppBar;
