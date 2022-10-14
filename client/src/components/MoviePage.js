import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

const MoviePage = () => {
    let params = useParams();
    let imdbID = params.imdbID;
    const [movie, setMovie] = useState("");
    const options = {
        method: "GET",
        url: "https://my-movies7.herokuapp.com/movie",
        params: { id: imdbID, r: "json" },
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setMovie(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    return (
        <div className="container-mp">
            {movie === "" && (
                <motion.div
                    className="center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bouncer">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </motion.div>
            )}
            {movie != "" && (
                <motion.div
                    className="movie-page"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0, transition: { duration: 0.3 } }}
                    exit={{ opacity: 0 }}
                >
                    <motion.h1
                        initial={{ y: "-20vh", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {movie.Title}
                    </motion.h1>
                    <div className="movie-subsection">
                        <motion.img
                            src={movie.Poster}
                            alt=""
                            initial={{ scale: 0.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        />
                        <motion.div
                            className="movie-details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h4>{movie.Plot}</h4>
                            <h2>{movie.Year}</h2>
                            <div>
                                <h4>IMDB Rating: </h4>
                                <span>
                                    {" "}
                                    {movie.imdbRating} ({movie.imdbVotes})
                                </span>
                                <h4>Country: </h4>
                                <span> {movie.Country}</span>
                                <h4>Genre: </h4>
                                <span> {movie.Genre}</span>
                                <h4>Starring: </h4>
                                <span> {movie.Actors}</span>
                                <h4>Writing : </h4>
                                <span>{movie.Writer}</span>
                                {movie.Type === "series" && <h4>Seasons: </h4>}
                                <span>{movie.totalSeasons}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default MoviePage;
