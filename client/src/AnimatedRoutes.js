<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
=======
import {
    Routes,
    Route,
} from "react-router-dom";
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb
import MoviePage from "./components/MoviePage";
import MyMovies from "./components/MyMovies";
import Register from "./components/Register";
import Login from "./components/Login";
import Movies from "./components/Movies";
import Homepage from "./components/Homepage/Homepage";
import ChangePassword from "./components/ChangePassword";
<<<<<<< HEAD

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
=======
import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = (props) => {

    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MyMovies
                    fav={props.fav}
                    toggle={props.toggle}
                    setToggle={props.setToggle}
                />} />
                <Route path="/search" element={<Movies
                    results={props.results}
                    fav={props.fav}
                    toggle={props.toggle}
                    setToggle={props.setToggle}
                    results2={props.results2}
                    handleSubmitMore={props.handleSubmitMore}
                    loading={props.loading}
                />} />
                <Route path="/moviepage/:imdbID" element={<MoviePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/changepassword" element={<ChangePassword />} />
            </Routes>
        </AnimatePresence>
    );
}
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb

export default AnimatedRoutes;