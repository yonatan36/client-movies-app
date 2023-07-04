import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Container, Collapse } from "@mui/material";

const AccordionContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(15),
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(0.2),
  maxWidth: "900px", // Adjust the desired width here
  margin: "0 auto", // Center the accordion horizontally
  overflow: "hidden",
  marginBottom: theme.spacing(0.8),
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  padding: theme.spacing(2.7),
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",

    textTransform: "uppercase", // Optionally, you can transform the text to uppercase
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#666" : "#bdbdbd",
    cursor: "pointer",
  },
}));

const AccordionComp = () => {
  const [expanded, setExpanded] = React.useState("");

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : "");
  };

  return (
    <AccordionContainer>
      <Typography
        variant="h4"
        sx={{
          fontSize: "3rem",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>what is YoonFlix?</Typography>
        </AccordionSummary>
        <Collapse in={expanded === "panel1"} timeout="auto" unmountOnExit>
          <AccordionDetails>
            <Typography>
              YoonFlix is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries, and more on
              thousands of internet-connected devices. You can watch as much as
              you want, whenever you want without a single commercial – all for
              one low monthly price. There's always something new to discover
              and new TV shows and movies are added every week!
            </Typography>
          </AccordionDetails>
        </Collapse>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Where can i watch?</Typography>
        </AccordionSummary>
        <Collapse in={expanded === "panel2"} timeout="auto" unmountOnExit>
          <AccordionDetails>
            <Typography>
              Watch anywhere, anytime. Sign in with your Netflix account to
              watch instantly on the web at netflix.com from your personal
              computer or on any internet-connected device that offers the
              Netflix app, including smart TVs, smartphones, tablets, streaming
              media players and game consoles. You can also download your
              favorite shows with the iOS, Android, or Windows 10 app. Use
              downloads to watch while you're on the go and without an internet
              connection. Take Netflix with you anywhere.
            </Typography>
          </AccordionDetails>
        </Collapse>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>How much does YoonFlix cost?</Typography>
        </AccordionSummary>
        <Collapse in={expanded === "panel3"} timeout="auto" unmountOnExit>
          <AccordionDetails>
            <Typography>
              Watch YoonFlix on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              ₪32.90 to ₪69.90 a month. No extra costs, no contracts.
            </Typography>
          </AccordionDetails>
        </Collapse>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel4d-header">
          <Typography>What can i watch on YoonFlix?</Typography>
        </AccordionSummary>
        <Collapse in={expanded === "panel4"} timeout="auto" unmountOnExit>
          <AccordionDetails>
            <Typography>
              Netflix has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Netflix originals, and more. Watch
              as much as you want, anytime you want.
            </Typography>
          </AccordionDetails>
        </Collapse>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Is YoonFlix good for kids?</Typography>
        </AccordionSummary>
        <Collapse in={expanded === "panel5"} timeout="auto" unmountOnExit>
          <AccordionDetails>
            <Typography>
              The YoonFlix Kids experience is included in your membership to
              give parents control while kids enjoy family-friendly TV shows and
              movies in their own space. Kids profiles come with PIN-protected
              parental controls that let you restrict the maturity rating of
              content kids can watch and block specific titles you don’t want
              kids to see.
            </Typography>
          </AccordionDetails>
        </Collapse>
      </Accordion>
    </AccordionContainer>
  );
};

export default AccordionComp;
