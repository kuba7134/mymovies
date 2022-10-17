import Movie from "./SingleMovie";
import { AnimatePresence, motion } from "framer-motion";

const Movies = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
    props.setToggle(!props.toggle);
  }, []);
  return (
    <AnimatePresence>
      {props.results && props.results !== "loading" && (
        <motion.div
          className="container"
          key="searchBox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            {props.results.wait && (
              <h3 style={{ color: "yellow" }}>
                Please wait up to 2 seconds before a new search.
              </h3>
            )}
            <div className="movies">
              {props.results === "noResults" ? (
                <div className="info-block">
                  <h3>Title not found!</h3>
                </div>
              ) : (
                <>
                  {props.results.Search.map((movie, index) => (
                    <Movie
                      key={movie.imdbID}
                      toggle={props.toggle}
                      setToggle={props.setToggle}
                      movie={movie}
                      delSign={
                        !props.fav || props.fav === "login"
                          ? "login"
                          : props.fav.some(
                              element => element.imdbID === movie.imdbID
                            )
                      }
                    />
                  ))}

                  {props.results2 && (
                    <>
                      {props.results2.map((movie, index) => (
                        <Movie
                          key={movie.imdbID}
                          toggle={props.toggle}
                          setToggle={props.setToggle}
                          delSign={
                            !props.fav || props.fav === "login"
                              ? "login"
                              : props.fav.some(
                                  element => element.imdbID === movie.imdbID
                                )
                          }
                          movie={movie}
                        />
                      ))}
                    </>
                  )}
                  {props.results.totalResults > props.results2.length + 10 && (
                    <div className="show-more">
                      {props.loading ? (
                        <div className="loader-circle">
                          <motion.div
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="div-bar"
                          >
                            <div className="small-blurred"></div>
                          </motion.div>
                        </div>
                      ) : (
                        <div
                          className="show-more-ch"
                          onClick={props.handleSubmitMore}
                        >
                          <h2>Total results: {props.results.totalResults}</h2>
                          <h2>Results shown: {props.results2.length + 10}</h2>
                          <h2>Show more</h2>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Movies;
