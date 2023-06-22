import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "black",
    color: "white",
    padding: theme.spacing(1),
    marginTop: "auto",
  },
  icon: {
    color: "white",
    marginRight: theme.spacing(1),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography
          variant="body2"
          align="center"
          fontWeight={600}
          color="white"
        >
          © {new Date().getFullYear()} yonatan taub
        </Typography>
        <Typography variant="body2" align="center">
          <IconButton className={classes.icon} href="https://www.linkedin.com/">
            <LinkedInIcon />
          </IconButton>
          <IconButton
            className={classes.icon}
            href="https://github.com/yonatan36"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            className={classes.icon}
            href="https://wa.me/972585668625"
          >
            <WhatsAppIcon />
          </IconButton>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
