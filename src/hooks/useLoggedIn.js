import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";

const useLoggedIn = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Access the user ID from the URL params

  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      await axios.get(`/auth/${id}`); // Use the retrieved user ID from the URL params
      const payload = jwt_decode(token);
      dispatch(authActions.login(payload));
    } catch (err) {
      // Handle error
    }
  };
};

export default useLoggedIn;
