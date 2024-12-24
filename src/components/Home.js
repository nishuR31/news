import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await axios.get("https://newsapi.org/v2/top-headlines?category=technology&apiKey=YOUR_API_KEY");
      setNews(data.articles);
    };
    fetchNews();
  }, []);

  return (
    <div className="home">
      <h1>Programming News</h1>
      <div className="news-container">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
