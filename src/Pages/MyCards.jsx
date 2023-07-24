import {
  Container,
  Typography,
  IconButton,
  useTheme,
  Grid,
  Box,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fragment, useState, forwardRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditCardDialog from "../components/DialogsPopups/EditCardDialog";
import DeleteDialog from "../components/DialogsPopups/DeleteDialog";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import CardForm from "../components/cardForm/CreateCard";
import Logo from "../components/Logo";
import MyLinearProgress from "../components/MyLinearProgress";
import CardComponent from "../components/cardComp";
import { toast } from "react-toastify";
import CreateDialog from "../components/DialogsPopups/CreateDialog";
import axios from "axios";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Avatar from "@mui/material/Avatar";

// Transition component for the dialog
const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MyCards = () => {
  const [cardsState, setCardsState] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [cardsArr, setCardArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cardToEdit, setCardToEdit] = useState([]);
  const [myCardIds, setMyCardIds] = useState([]);

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const [openBizDialog, setOpenBizDialog] = useState(false);
  const { isLoggedIn } = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice
  );
  const theme = useTheme();

  useEffect(() => {
    const delay = setTimeout(() => {
      axios
        .get("/cards/my-cards")
        .then(({ data }) => {
          setCardArr(data);
          setIsLoading(false);
        })
        .catch((err) => toast.error("Oops check the server"));
    }, 1700);

    return () => clearTimeout(delay);
  }, []);

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCardToEdit([]);
  };

  const handleClickOpen = () => {
    // Open the add card dialog
    setOpenBizDialog(true);
  };

  const handleCloseWithoutAdd = () => {
    // Close the add card dialog without adding a new card
    setAddDialogOpen(false);
  };

  const handleClose = (newCard) => {
    // Close the add card dialog and update the cards state with a new card if provided
    setAddDialogOpen(false);
    setCardsState([...cardsState, newCard ? newCard : ""]);
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    setCardToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCard = async () => {
    try {
      setCardArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== cardToDelete)
      );
      setIsDeleteDialogOpen(false);
      toast.success("Deletion was successful");
      await axios.delete("/cards/" + cardToDelete);
    } catch (err) {
      console.log("error delete", err.response.data);
    }
  };
  const replaceEditedCard = (editedCard) =>
    setCardArr(
      cardsArr.map((x) => {
        if (x._id !== editedCard._id) {
          return x;
        }
        return editedCard;
      })
    );
  const handlelikedCard = (id) => {
    setCardArr(cardsArr.filter((card) => card[1]._id !== id));
  };

  const handleEditFromInitialCardsArr = (id) => {
    const card = cardsArr.find((item) => item._id === id);
    const url = card && card.image && card.image.url ? card.image.url : "";
    const alt = card && card.image && card.image.alt ? card.image.alt : "";
    const updatedCard = {
      ...card,
      url,
      alt,
    };

    setCardToEdit(updatedCard);
    setOpenEditDialog(true);
  };

  const handleBizDialogClose = () => {
    setOpenBizDialog(false);
  };
  if (isLoading) {
    return (
      <>
        <MyLinearProgress />
        <Logo />
      </>
    );
  }

  if (!cardsArr) {
    return <MyLinearProgress />;
  }

  return (
    <Fragment>
      <Container
        maxWidth="md"
        sx={{
          mt: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h1" variant="h4" align="left" sx={{ mt: 5 }}>
          Your Movies
        </Typography>
        <IconButton
          color="inherit"
          size="large"
          sx={{ backgroundColor: theme.palette.error.main }}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </IconButton>
      </Container>

      <Dialog
        fullScreen
        open={addDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} color="error">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseWithoutAdd}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" component="div">
                Add new movie
              </Typography>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  ml: 1,
                }}
              >
                <VideoCallIcon />
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="lg"
          sx={{
            mt: 3,
            mb: 3,
          }}
        >
          <CardForm onClose={handleClose} edit={false} />
        </Container>
      </Dialog>
      <Container maxWidth="lg" sx={{ my: 2, display: "flex" }}>
        <Grid
          container
          spacing={1}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {Array.isArray(cardsArr) && cardsArr.length > 0 ? (
            cardsArr.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subTitle={item.subTitle}
                  phone={item.phone}
                  img={item.image ? item.image.url : ""}
                  description={item.description}
                  createdYear={item.createdYear}
                  createdAt={item.createdAt}
                  likes={item.likes}
                  bizNumber={item.bizNumber}
                  notConnected={!payload}
                  isMyCard={myCardIds.includes(item._id)}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onEdit={handleEditFromInitialCardsArr}
                  canEdit={
                    (payload && payload.isAdmin) ||
                    (payload &&
                      payload.isBusiness &&
                      payload._id === item.user_id)
                  }
                  canDelete={
                    (payload && payload.isAdmin) ||
                    (payload &&
                      payload.isBusiness &&
                      payload._id === item.user_id)
                  }
                  onRemoveLikes={handlelikedCard}
                  isLiked={
                    localStorage.token &&
                    item.likes.includes(jwt_decode(localStorage.token)._id)
                  }
                />
              </Grid>
            ))
          ) : (
            <Container
              maxWidth="md"
              sx={{
                mt: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Typography
                component="h1"
                variant="h6"
                align="left"
                sx={{ mt: 1, ml: 2 }}
              >
                You haven't created any movies yet. Start by adding your own
                movies and share your passion with others!
              </Typography>
            </Container>
          )}
        </Grid>
        <DeleteDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          cardToDelete={handleDeleteCard}
        />
        <EditCardDialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          cardToEdit={cardToEdit}
          setCardToEdit={setCardToEdit}
          replaceEditedCard={replaceEditedCard}
        />
        <CreateDialog
          open={openBizDialog}
          onClose={handleBizDialogClose}
          openCreate={setAddDialogOpen}
        />
      </Container>
    </Fragment>
  );
};

export default MyCards;
