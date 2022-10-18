import React from "react";
import "./seats.scss";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  hidden: {
    opacity: 1,
    transition: { duration: 0.4, type: "spring", stiffness: 500 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.7 },
  },
};

const Seats = () => {
  return (
    <div className="seats-container">
      <motion.div
        className="popcorn-container"
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <motion.img
          animate={{
            scale: 1,
            rotate: 10,
            transition: {
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            },
          }}
          src="pics/popcorn.png"
          alt="popcorn"
          className="popcorn-img"
        />
        <div className="headers">
          <h1>Find a movie</h1>
          <h2>and add it to your collection</h2>
        </div>
      </motion.div>
      <div className="logos">
        <img className="logo-img" src="pics/1.png" alt="1" />
        <img className="logo-img" src="pics/2.png" alt="2" />
        <img className="logo-img" src="pics/3.png" alt="3" />
        <img className="logo-img" src="pics/4.png" alt="4" />
      </div>
      <img src="pics/siedzenia2.jpg" alt="seats" className="seats-img" />
    </div>
  );
};

export default Seats;
