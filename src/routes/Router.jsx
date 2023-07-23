import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/registerPage/Register";
import Login from "../Pages/login/Login";
import About from "../Pages/About";
import ROUTES from "./ROUTES.js";
import Fav from "../Pages/Fav";
import Profile from "../Pages/profile/Profile";
import LogOut from "../components/LogOut";
import MyCards from "../Pages/MyCards";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import SuperProtectedRoute from "../components/ProtectedRoute/SuperProtectedRoute";
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.FAKEHOME} element={<Home />} />
      <Route
        exact
        path={ROUTES.HOME}
        element={<ProtectedRoute element={<Home />} />}
      />
      <Route
        exact
        path={ROUTES.FAV}
        element={<ProtectedRoute element={<Fav />} />}
      />
      <Route
        exact
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogOut />} />}
      />
      <Route exact path={ROUTES.REGISTER} element={<Register />} />
      <Route exact path={ROUTES.LOGIN} element={<Login />} />
      <Route exact path={ROUTES.ABOUT} element={<About />} />
      <Route exact path={ROUTES.PROFILE} element={<Profile />} />

      <Route
        exact
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBusiness={true}
            element={<MyCards />}
          />
        }
      />
    </Routes>
  );
};

export default Router;
