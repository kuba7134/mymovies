import React from "react";
import "./homepage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleNews from "./SingleNews";
import Seats from "./Seats";
import { motion } from "framer-motion";

const Homepage = () => {
  const [news, setNews] = useState();
  useEffect(() => {
    axios
      .get("https://my-movies7.herokuapp.com/news")
      .then(function (response) {
        setNews(response.data.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <motion.div
      className="container-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Seats />
      <div className="news-container">
        <ul className="news-list">
          {news &&
            news.map((item, index) => <SingleNews key={index} news={item} />)}
        </ul>
      </div>
    </motion.div>
  );
};

export default Homepage;
