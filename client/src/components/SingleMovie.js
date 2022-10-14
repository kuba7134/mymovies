import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Movie = (props) => {
    let navigate = useNavigate();
    let data = { movie: props.movie, token: localStorage.token };
    let data2 = { imdbID: props.movie.imdbID, token: localStorage.token };

    const handleClick = () => {
        axios
            .post("https://my-movies7.herokuapp.com/favourites", data)
            .then(function (response) {
                console.log(response);
            })
            .then(() => {
                props.setToggle(!props.toggle);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleClick2 = () => {
        axios
            .delete("https://my-movies7.herokuapp.com/favourites", {
                data: data2,
            })
            .then(function (response) {
                console.log(response);
            })
            .then(() => {
                props.setToggle(!props.toggle);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const buttonVariants = {
        initial: {
            scale: 1,
        },
        hidden: {
            scale: [1, 1.3, 0],
            transition: { duration: 0.3, type: "spring", stiffness: 500 },
        },
        visible: {
            scale: [0, 1.3, 1],
            transition: { duration: 0.3 },
        },
    };

    return (
        <motion.div
            className="single-movie"
            exit={{ opacity: 0, y: "-100px", transition: { ease: "easeOut" } }}
            key={props.movie.imdbID + "motion"}
            layoutId={props.movie.imdbID}
        >
            <motion.img
                onClick={() => navigate(`/moviepage/${props.movie.imdbID}`)}
                className="poster"
                src={props.movie.Poster}
                alt={props.movie.Title + " - poster"}
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            />
            <p>{props.movie.Title}</p>
            <div className="movie-info">
                <span className="type">Type: {props.movie.Type}</span>
                <span className="year">{props.movie.Year}</span>
            </div>
            <div className="hidden-icon">
                <a
                    href={"https://www.imdb.com/title/" + props.movie.imdbID}
                    target="_blank"
                >
                    <img
                        src="https://i.pinimg.com/originals/e7/17/2e/e7172e01718bc174bc237b5971659548.png"
                        alt="imdb-logo"
                    />
                </a>
                <AnimatePresence mode="wait">
                    {props.delSign === "login" ? (
                        <img
                            className="adddel"
                            onClick={() => navigate("/login")}
                            src="https://www.clipartmax.com/png/full/43-433845_ambox-emblem-plus-green-plus-symbol.png"
                            alt="add button"
                        />
                    ) : props.delSign ? (
                        <motion.img
                            variants={buttonVariants}
                            initial="initial"
                            animate="visible"
                            exit="hidden"
                            key="minus"
                            className="adddel"
                            onClick={handleClick2}
                            src="https://i.pinimg.com/originals/d0/17/47/d01747c4285afa4e7a6e8656c9cd60cb.png"
                            alt="add button"
                        />
                    ) : (
                        <motion.img
                            variants={buttonVariants}
                            initial="initial"
                            animate="visible"
                            exit="hidden"
                            key="plus"
                            className="adddel"
                            onClick={handleClick}
                            src="https://www.clipartmax.com/png/full/43-433845_ambox-emblem-plus-green-plus-symbol.png"
                            alt="add button"
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Movie;
