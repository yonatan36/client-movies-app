import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CardComponent from "../components/cardComp";
import { Box, Grid, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import EditCardDialog from "../components/DialogsPopups/EditCardDialog";
import DeleteDialog from "../components/DialogsPopups/DeleteDialog";

const Fav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardsArr, setCardArr] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [cardToDelete, setCardToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [myCardIds, setMyCardIds] = useState([]);

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const navigate = useNavigate();

useEffect(() => {
  axios
    .get("/cards/my-cards")
    .then(({ data }) => {
      setMyCardIds(data.map((item) => item._id));
    })
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  const fetchLikedCards = async () => {
    try {
      // Simulate a delay of 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { data } = await axios.get("/cards");

      const filterdData = data.filter((card) =>
        card.likes.includes(payload && payload._id)
      );
setIsLoading(false)
      setCardArr(filterdData); // Update the value of cardsArr
    } catch (err) {
      console.log(err);
    }
  };

  fetchLikedCards();
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
    setCardToEdit(null);
  };
  //likes function
  const handlelikedCard = (id) => {
    setCardArr(cardsArr.filter((card) => card[1]._id !== id));
  };

   const handleEditFromInitialCardsArr = (id) => {
     
     const card = cardsArr.find((item) => item._id === id);
     setCardToEdit(card);
     setOpenEditDialog(true);
   };

  if (isLoading) {
    return <LinearProgress color="error" sx={{ mt: { xs: 7.5, md: 11 } }} />;
  }
  if (!cardsArr) {
    return <LinearProgress color="error" sx={{ mt: { xs: 7.5, md: 11 } }} />;
  }
  return (
    <>
      <Box mt={15} sx={{ left: { xs: 5, md: 10 } }} mb={9}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your favorite movies!
        </Typography>
      </Box>
      <Container maxWidth="lg" mt={8} sx={{ my: 2, display: "flex" }}>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {cardsArr.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
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
          setCardArr={setCardArr}
          setCardToEdit={setCardToEdit}
        />
      </Container>
    </>
  );
};

export default Fav;
