import { Typography, IconButton, Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <footer
      sx={{
        color: "white",
        padding: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} yonatan taub
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <IconButton sx={{ marginRight: 1 }} href="https://www.linkedin.com/">
            <LinkedInIcon />
          </IconButton>
          <IconButton
            sx={{ marginRight: 1 }}
            href="https://github.com/yonatan36"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton href="https://wa.me/972585668625">
            <WhatsAppIcon />
          </IconButton>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
