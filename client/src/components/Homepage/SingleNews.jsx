import React from "react";
import { motion } from "framer-motion";

const SingleNews = props => {
  return (
    <motion.li
      className="single-news"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
    >
      <a href={props.news.link} target="blank">
        <p>{props.news.title}</p>
      </a>
      <img className="news-img" src={props.news.image} />
    </motion.li>
  );
};

export default SingleNews;
