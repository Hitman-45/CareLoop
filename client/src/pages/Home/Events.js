import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 🔹 import Link for navigation
import "./Events.css";
import serverAPI from "../../api/serverAPI";
import Loading from "../../components/Loading/Loading";

// Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Events({ lang }) {

  const [StoryModeText, setStoryModeText] = useState("Story Mode");
  const [StoryDesc, setStoryDesc] = useState(
    "Learn how to talk sensitively to people suffering with different issues through curated conversations!"
  );
  const [MiaText, setMiaText] = useState("Menstrual");
  const [MiaDesc, setMiaDesc] = useState("Track your next period with accuracy using our menstrual feature. Get personalized insights and support through our AI-powered period chatbox!");
  const [NewsText, setNewsText] = useState("News");
  const [NewsDesc, setNewsDesc] = useState("Get the latest updates on mental health!");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const translate = async () => {
      const translationDetails = {
        to: lang,
        StoryModeText,
        StoryDesc,
        MiaText,
        MiaDesc,
        NewsText,
        NewsDesc,
      };

      if (lang !== "en") {
        try {
          const response = await serverAPI.post("/translate", translationDetails);
          if (response && response.data) {
            setStoryModeText(response.data.StoryModeText);
            setStoryDesc(response.data.StoryDesc);
            setMiaText(response.data.MiaText);
            setMiaDesc(response.data.MiaDesc);
            setNewsText(response.data.NewsText);
            setNewsDesc(response.data.NewsDesc);
          }
        } catch (err) {
          setIsLoading(false);
          toast.error(`Unable to load the app. Please check your internet connection and try again.`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }

      setIsLoading(false);
    };

    translate();
  }, [lang]);

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <div className="container">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div className="row">
            <div className="col">
              <div className="main-timeline">

                {/* Story Mode */}
                <div className="timeline">
                  <Link to="/story" className="timeline-content" style={{ textDecoration: "none" }}>
                    <div className="timeline-icon">
                      <i className="fa fa-rocket" aria-hidden="true"></i>
                    </div>
                    <div className="ImageContainer">
                      <div className="content">
                        <h3 className="title">{StoryModeText}</h3>
                        <p className="description">{StoryDesc}</p>
                      </div>
                      <div className="ImageDiv">
                        <img
                          className="homePageImage1"
                          src="https://dy7glz37jgl0b.cloudfront.net/betterhelp_two/photos/image-how-it-works-2-phone.png?v=0177f73d2461"
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Menstrual */}
                <div className="timeline">
                  <Link to="/menstrual" className="timeline-content" style={{ textDecoration: "none" }}>
                    <div className="timeline-icon">
                      <i className="fa fa-users" aria-hidden="true"></i>
                    </div>
                    <div className="ImageContainer">
                      <div className="ImageDiv">
                        <img
                          className="homePageImage1"
                          src="https://images.theconversation.com/files/454716/original/file-20220328-15-1rfv76b.jpg?ixlib=rb-1.1.0&rect=16%2C0%2C3578%2C1880&q=45&auto=format&w=926&fit=clip"
                          alt=""
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">{MiaText}</h3>
                        <p className="description">{MiaDesc}</p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* News */}
                <div className="timeline">
                  <Link to="/news" className="timeline-content" style={{ textDecoration: "none" }}>
                    <div className="timeline-icon">
                      <i className="fa fa-cog" aria-hidden="true"></i>
                    </div>
                    <div className="ImageContainer">
                      <div className="content">
                        <h3 className="title">{NewsText}</h3>
                        <p className="description">{NewsDesc}</p>
                      </div>
                      <div className="ImageDiv">
                        <img
                          className="homePageImage1"
                          src="https://i0.wp.com/calmatters.org/wp-content/uploads/2022/02/mental-health.jpg?fit=2121%2C1414&ssl=1"
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Events;
