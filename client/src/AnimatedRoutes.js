import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MoviePage from "./components/MoviePage";
import MyMovies from "./components/MyMovies";
import Register from "./components/Register";
import Login from "./components/Login";
import Movies from "./components/Movies";
import Homepage from "./components/Homepage/Homepage";
import ChangePassword from "./components/ChangePassword";

const AnimatedRoutes = props => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/favourites"
          element={
            <MyMovies
              fav={props.fav}
              setFav={props.setFav}
              toggle={props.toggle}
              setToggle={props.setToggle}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Movies
              results={props.results}
              fav={props.fav}
              toggle={props.toggle}
              setToggle={props.setToggle}
              results2={props.results2}
              handleSubmitMore={props.handleSubmitMore}
              loading={props.loading}
            />
          }
        />
        <Route path="/moviepage/:imdbID" element={<MoviePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
