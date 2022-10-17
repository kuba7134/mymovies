import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = props => {
  const [toggle, setToggle] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {}, [toggle]);

  return (
    <nav>
      <Link className="home" to={`/`}>
        <motion.h1
          initial={{ fontSize: 0, opacity: 0 }}
          animate={{
            fontSize: "1.5em",
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          <AiFillHome />
        </motion.h1>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "white" }}
        to={`/favourites`}
        className="camera"
      >
        <motion.h1
          initial={{ fontSize: 0, opacity: 0 }}
          animate={{
            fontSize: "1.5em",
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          className="camera-icon"
        >
          My movies
          <span> </span>
          <BsFillCameraReelsFill />
        </motion.h1>
      </Link>
      <motion.div
        className="rightSide"
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3 },
        }}
      >
        {localStorage.user ? (
          <>
            {localStorage.user && (
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "650",
                }}
                to="/changepassword"
              >
                <div className="user">
                  User:
                  <div className="">{localStorage.user}</div>
                </div>
              </Link>
            )}
            <button
              className="navbar-button"
              onClick={() => {
                navigate("/login", { replace: true });
                localStorage.clear();
                props.setFav("");
                setToggle(!toggle);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="navbar-button"
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Login
          </button>
        )}
      </motion.div>
      <form onSubmit={props.handleSubmit}>
        <div id="title" className="fancy-input">
          <input
            type="text"
            placeholder=" "
            required
            className="form-input"
            id="search"
            value={props.title}
            onChange={e => props.setTitle(e.target.value)}
          />
          <label htmlFor="search" className="form-label">
            Title
          </label>
        </div>
        <div className="fancy-input">
          <select
            name="Type"
            style={{ color: "white" }}
            className="select-type"
            value={props.type}
            onChange={e => props.setType(e.target.value)}
          >
            <option style={{ color: "black" }} value="">
              All
            </option>
            <option style={{ color: "black" }} value="movie">
              Movie
            </option>
            <option style={{ color: "black" }} value="series">
              Series
            </option>
          </select>
        </div>
        <div className="fancy-input">
          <input
            type="number"
            min={1900}
            max={2030}
            id="year"
            placeholder=" "
            className="form-input"
            value={props.year}
            onChange={e => props.setYear(e.target.value)}
          />
          <label htmlFor="year" className="form-label">
            Year
          </label>
        </div>
        <button
          className="navbar-button"
          onClick={() => navigate("/search", { replace: true })}
        >
          Search
        </button>
      </form>
      <div className="navbar-menu">
        {toggleMenu ? (
          <AiOutlineClose size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <AiOutlineMenu size={27} onClick={() => setToggleMenu(true)} />
        )}
        <AnimatePresence>
          {toggleMenu && (
            <motion.div
              key="menu-container"
              className="navbar-menu-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {localStorage.user ? (
                <>
                  <p>User: {localStorage.user}</p>
                  <Link
                    to="/login"
                    onClick={() => {
                      localStorage.clear();
                      props.setFav("");
                      setToggle(!toggle);
                      setToggleMenu(false);
                    }}
                    className="navbar-menu-item"
                  >
                    Sign out
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="navbar-menu-item"
                  onClick={() => setToggleMenu(false)}
                >
                  Sign in
                </Link>
              )}
              <Link
                to="/favourites"
                className="navbar-menu-item"
                onClick={() => setToggleMenu(false)}
              >
                My movies
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
