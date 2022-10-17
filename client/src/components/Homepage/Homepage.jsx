import React from "react";
import "./homepage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleNews from "./SingleNews";
import Seats from "./Seats";

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
    <div className="container-home">
      <Seats />
      <div className="news-container">
        <ul className="news-list">
          {news &&
            news.map((item, index) => <SingleNews key={index} news={item} />)}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
