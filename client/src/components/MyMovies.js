import Movie from "./SingleMovie";
import { useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom";

<<<<<<< HEAD
const MyMovies = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.setToggle(!props.toggle);
  }, []);
=======
const MyMovies = (props) => {

    useEffect(() => {
        props.setToggle(!props.toggle)
    }, [])
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {(props.fav === false || props.fav.length === 0) && (
        <motion.h3
          layoutId="search"
          key="searchKey"
          className="info-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
<<<<<<< HEAD
          Use search to add movies to your collection
        </motion.h3>
      )}
      {props.fav === "login" && (
        <h3 className="info-block">
          <Link to="/login">Sign in</Link> to see your collection
        </h3>
      )}
      {props.fav && props.fav !== "login" && (
        <div className="movies">
          <AnimatePresence>
            {props.fav.map((movie, index) => (
              <Movie
                key={movie.imdbID}
                setFav={props.setFav}
                movie={movie}
                delSign={true}
                toggle={props.toggle}
                setToggle={props.setToggle}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};
=======
            {(props.fav === false || props.fav.length === 0) &&
                <motion.h3
                    layoutId="search"
                    key="searchKey"
                    className="info-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: .5 } }}
                >
                    Use search to add movies to your collection
                </motion.h3>
            }
            {props.fav === "login" &&
                <h3 className="info-block"><Link to="/login">Sign in</Link> to see your collection</h3>
            }
            {props.fav && props.fav !== "login" &&
                <div className="movies">
                    <AnimatePresence>
                        {props.fav.map((movie, index) =>
                                <Movie
                                    key={movie.imdbID}
                                    movie={movie}
                                    delSign={true}
                                    toggle={props.toggle}
                                    setToggle={props.setToggle}
                                />
                        )}
                    </AnimatePresence>
                </div>
            }
        </motion.div >
    );
}
>>>>>>> fa99b5dc4060f251afec193f4507f3df624ee8eb

export default MyMovies;