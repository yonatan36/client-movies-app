// import { Link } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import NavLinkComponent from "./NavLinkComponent";

// const NavLinkDialogComp = () => {
//   const handleLoginClick = () => {
//     setOpen(true); // Open the login modal or perform other login-related actions
//   };

//   return (
//     <Link
//       key={"dialog"}
//       onClick={() => setOpen(true)}
//       style={{
//         textDecoration: "none",
//         display: "block",
//         padding: 2,
//         marginTop: 2,
//       }}
//     >
//       {({ isActive }) => (
//         <Typography
//           variant="body1"
//           sx={{
//             my: 2,
//             color: isActive ? "#f44336" : "#64b5f6",
//             fontWeight: "bold",
//             textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
//             transition: "all 0.3s ease-in-out",
//             position: "relative",
//             overflow: "hidden",
//             "&::before, &::after": {
//               content: "''",
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               opacity: 0,
//               transition: "all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s",
//             },
//             "&::before": {
//               backgroundColor: "rgba(255, 255, 255, 0.15)",
//               transform: "translateX(-100%) skewX(-15deg)",
//             },
//             "&::after": {
//               backgroundColor: "rgba(255, 255, 255, 0.15)",
//               transform: "translateX(100%) skewX(15deg)",
//             },
//             "&:hover::before": {
//               transform: "translateX(0%) skewX(-15deg)",
//               opacity: 1,
//             },
//             "&:hover::after": {
//               transform: "translateX(0%) skewX(15deg)",
//               opacity: 1,
//             },
//             "&:hover": {
//               textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
//             },
//           }}
//         >
//           Login
//         </Typography>
//       )}
//     </Link>
//   );
// };

// export default NavLinkDialogComp;
