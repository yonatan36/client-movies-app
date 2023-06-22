import {
  Container,
  Typography,
  IconButton,
  useTheme,
  Grid,
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
import CardComponent from "../components/cardComp";
import { toast } from "react-toastify";
import axios from "axios";
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
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [myCardIds, setMyCardIds] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const { isLoggedIn } = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice
  );
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCardToEdit(null);
  };

  const handleClickOpen = () => {
    // Open the add card dialog
    setAddDialogOpen(true);
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
  const handlelikedCard = (id) => {
    setCardArr(cardsArr.filter((card) => card[1]._id !== id));
  };

  const handleEditFromInitialCardsArr = (id) => {
    const card = cardsArr.find((item) => item._id === id);
    const url = card && card.image && card.image.url ? card.image.url : "";
    const alt = card && card.image && card.image.alt ? card.image.alt : "";

    // Copy the imageUrl to the card object
    const updatedCard = {
      ...card,

      url,
      alt,
    };

    setCardToEdit(updatedCard);
    setOpenEditDialog(true);
  };

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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add new movie
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 3 }}>
          <CardForm onClose={handleClose} edit={false} />
        </Container>
      </Dialog>
      <Container maxWidth="lg" sx={{ my: 2, display: "flex" }}>
        <Grid
          container
          spacing={3.5}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {cardsArr.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <CardComponent
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                phone={item.phone}
                img={item.image ? item.image.url : ""}
                description={item.description}
                email={item.email}
                createdAt={item.createdAt}
                likes={item.likes}
                bizNumber={item.bizNumber}
                notConnected={!payload}
                isMyCard={myCardIds.includes(item._id)}
                onDelete={handleDeleteFromInitialCardsArr}
                onEdit={handleEditFromInitialCardsArr}
                canEdit={
                  payload && payload.isBusiness && payload._id === item.user_id
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
          ))}
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
        />
      </Container>
    </Fragment>
  );
};

export default MyCards;
