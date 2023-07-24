import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import ROUTES from "./ROUTES.js";
import Fav from "../Pages/Fav";
import LogOut from "../components/LogOut";
import MyCards from "../Pages/MyCards";
import PageNotFound from "../Pages/PageNotFound";
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
      <Route exact path={ROUTES.LOGOUT} element={<LogOut />} />

      <Route exact path={ROUTES.ABOUT} element={<About />} />

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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
