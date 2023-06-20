import React, { useEffect } from "react";
import CarouselComponent from "../components/CarouselComp";
import ImageSlider from "../components/ImageSliderComp";
import DeleteDialog from "../components/DialogsPopups/DeleteDialog";
import EditCardDialog from "../components/DialogsPopups/EditCardDialog";
import CardComponent from "../components/cardComp";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import axios from "axios";
import {
  Grid,
  Container,
} from "@mui/material";
function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardsArr, setCardArr] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
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
      console.log("error delete", err.response.data);
    }
  };

  // const handleEditFromInitialCardsArr = (id) => {
  //   const card = cardsArr.find((item) => item._id === id);
  //   setCardToEdit(card);
  //   setOpenEditDialog(true);
  // };

  
  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setCardToEdit(null);
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
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
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


  const handleEditFromInitialCardsArr = (id) => {
    const card = cardsArr.find((item) => item._id === id);
       setCardToEdit(card);
       setOpenEditDialog(true);
    console.log(`${id}`);
  };

  if (isLoading) {
    return <LinearProgress color="error" sx={{ mt: { xs: 7.5, md: 11 } }} />;
  }

  if (!cardsArr) {
    return <LinearProgress color="error" sx={{ mt: { xs: 7.5, md: 11 } }} />;
  }

  return (
    <>
      {qparams.filter ? "" : <CarouselComponent />}

      <Container
        maxWidth="lg"
        sx={{ my: 2, display: "flex", marginTop: qparams.filter ? 14 : 0 }}
      >
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
                address={`${item.country}, ${item.city}, ${item.street} ${item.houseNumber}`}
                img={item.image ? item.image.url : ""}
                description={item.description}
                email={item.email}
                createdAt={item.createdAt}
                likes={item.likes}
                bizNumber={item.bizNumber}
                onDelete={handleDeleteFromInitialCardsArr}
                onEdit={handleEditFromInitialCardsArr}
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
    </>
  );
}

export default Home;



