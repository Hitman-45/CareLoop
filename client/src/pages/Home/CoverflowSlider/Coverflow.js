import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./Coverflow.css";

import serverAPI from "../../../api/serverAPI";

const Coverflow = () => {
  const [articles, setArticles] = useState([]);
  const [apiCallCount, setApiCallCount] = useState(0);
  const maxApiCalls = 3;

  useEffect(() => {
    const getArticles = async () => {
      if (apiCallCount >= maxApiCalls) return;

      try {
        const response = await serverAPI.get("/news");

        if (response.data.articles) {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.articles,
          ]);
        }

        setApiCallCount((prev) => prev + 1);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    getArticles();
  }, [apiCallCount]);

  return (
    <div className="swiper-container-coverflow">
      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
      >
        {articles
          .filter(
            (article) =>
              article.urlToImage &&
              article.description &&
              article.title &&
              article.url
          )
          .map((article, index) => (
            <SwiperSlide key={index}>
              <img
                src={article.urlToImage}
                alt="news"
                className="swiper-slide-image"
              />
              <h4>{article.title}</h4>
              <Link to={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Coverflow;
