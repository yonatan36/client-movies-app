import React, { useEffect } from "react";
import CarouselComponent from "../components/Carousel";
import ImageSlider from "../components/ImageSlider";
import CardComponent from "../components/cardComp";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardsArr, setCardArr] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
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
        })
        .catch((err) => console.log(err));
    }, 2000);

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

  if (isLoading) {
    return <LinearProgress color="error" />;
  }
  if (!cardsArr) {
    return <LinearProgress color="error" />;
  }

  return (
    <>
      <CarouselComponent />

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
                address={
                  item.country +
                  ", " +
                  item.city +
                  ", " +
                  item.street +
                  " " +
                  item.houseNumber
                }
                img={item.image ? item.image.url : ""}
                description={item.description}
                email={item.email}
                createdAt={item.createdAt}
                likes={item.likes}
                bizNumber={item.bizNumber}
                onDelete={handleDeleteFromInitialCardsArr}
                canDelete={
                  (payload && payload.isAdmin) ||
                  (payload &&
                    payload.isBusiness &&
                    payload._id === item.user_id)
                }
              />
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
          <DialogContent>
            Deleting a card is permanent and cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteCard} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Home;
