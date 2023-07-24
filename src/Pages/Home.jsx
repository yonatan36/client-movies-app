import React, { useEffect } from "react";
import CarouselComponent from "../components/CarouselComp";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteDialog from "../components/DialogsPopups/DeleteDialog";
import EditCardDialog from "../components/DialogsPopups/EditCardDialog";
import CardComponent from "../components/cardComp";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Logo from "../components/Logo";
import axios from "axios";
import MyLinearProgress from "../components/MyLinearProgress";
import { Grid, Container, Typography } from "@mui/material";
function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardsArr, setCardArr] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cardToEdit, setCardToEdit] = useState([]);
  const [myCardIds, setMyCardIds] = useState([]);
  const [firstLoggedIn, setFirstLoggedIn] = useState(true);
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const { isLoggedIn } = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      axios
        .get("/cards")
        .then(({ data }) => {
          setCardArr(data);
          setIsLoading(false);
          setFirstLoggedIn(false);
        })
        .catch((err) => toast.error("Oops check the server"));
    }, 1700);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("/cards/my-cards")
        .then(({ data }) => {
          setMyCardIds(data.map((item) => item._id));
        })
        .catch((err) => {});
    }
  }, [isLoggedIn]);

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

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCardToEdit([]);
  };

  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {});
  }, []);

  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardArr(
        newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
      );
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

  //likes function
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
  useEffect(() => {
    if (!firstLoggedIn || !isLoggedIn) {
      return;
    }
    setFirstLoggedIn(false);
  }, [firstLoggedIn, isLoggedIn]);

  if (firstLoggedIn && isLoggedIn) {
    return <CircularProgress sx={{ mt: { xs: 7.5, md: 9.5 } }} />;
  }

  if (isLoading) {
    return (
      <>
        <MyLinearProgress />
        <Logo />
      </>
    );
  }

  if (!cardsArr) {
    return (
      <>
        <MyLinearProgress />;
      </>
    );
  }

  return (
    <>
      {qparams.filter ? "" : <CarouselComponent />}
      {qparams.filter ? (
        ""
      ) : (
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 3,
            mb: 3,
          }}
        >
          <Typography
            component="h1"
            fontWeight="700"
            fontSize="1.7rem"
            align="left"
          >
            Welcome to a World of Movies
          </Typography>
        </Container>
      )}

      <Container
        maxWidth="lg"
        sx={{ my: 2, display: "flex", marginTop: qparams.filter ? 14 : 0 }}
      >
        <Grid
          container
          spacing={1}
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
          ))}
        </Grid>
        {/* {cardsArr.map((x) => ( */}
        <DeleteDialog
          // key={x._id}
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          cardToDelete={handleDeleteCard}
          // title={x.title}
        />
        {/*  ))} */}

        <EditCardDialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          cardToEdit={cardToEdit}
          setCardToEdit={setCardToEdit}
          replaceEditedCard={replaceEditedCard}
          onEdit={handleEditFromInitialCardsArr}
        />
      </Container>
    </>
  );
}

export default Home;
