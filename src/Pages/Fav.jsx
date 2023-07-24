import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardComponent from "../components/cardComp";
import { Grid, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import MyLinearProgress from "../components/MyLinearProgress";
import EditCardDialog from "../components/DialogsPopups/EditCardDialog";
import DeleteDialog from "../components/DialogsPopups/DeleteDialog";
import Logo from "../components/Logo";
const Fav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardsArr, setCardArr] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cardToEdit, setCardToEdit] = useState([]);
  const [myCardIds, setMyCardIds] = useState([]);
  const [title, SetTitle] = useState(null);

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    const delay = setTimeout(() => {
      axios
        .get("/cards/my-cards")
        .then(({ data }) => {
          setIsLoading(false);
          setMyCardIds(data.map((item) => item._id));
        })
        .catch((err) => {});
    }, 1700);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      axios

        .get("/cards")
        .then((response) => {
          const data = response.data;

          const filteredData = data.filter((card) =>
            card.likes.includes(payload && payload._id)
          );
          SetTitle(data.title);
          setIsLoading(false);
          setCardArr(filteredData); // Update the value of cardsArr
        })
        .catch((err) => toast.error("Oops check the server"));
    }, 1700);

    return () => clearTimeout(delay);
  }, []);

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
      console.log("error delate", err.response.data);
    }
  };
  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCardToEdit([]);
  };
  //likes function
  const handlelikedCard = (id) => {
    setCardArr((prevCardsArr) =>
      prevCardsArr.filter((card) => card._id !== id)
    );
    toast.info(`movie removed!`);
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
    <>
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
          Your favorite Movies
        </Typography>
      </Container>
      <Container maxWidth="lg" mt={8} sx={{ my: 2, display: "flex" }}>
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
                sx={{ mt: 1, ml: 1 }}
              >
                You haven't liked any movies yet. Start exploring and find your
                favorites!
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
          setCardArr={setCardArr}
          setCardToEdit={setCardToEdit}
        />
      </Container>
    </>
  );
};

export default Fav;
