import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Header from "./Navbar";
import "./Home.css";
import Astronaut from "./Astronaut";

const Home = () => {
  const [showVideo, setShowVideo] = useState(false); // State to control video visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleExploreClick = () => {
    setShowVideo(true); // Show the video when "Explore" is clicked
    setTimeout(() => {
      navigate("/space"); // Redirect after 5 seconds
    }, 5000); // Set timeout for 5 seconds
  };

  return (
    <div className="home-container">
      <Header />

      {/* Keep the background video even when the hyperspace video is playing */}
      <video id="background-video" autoPlay muted loop>
        <source
          src="src/assets/Interstellar Gargantua black hole 4K live wallpaper for free windows 7810111080p60.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Hyperspace video will only show when "Explore" is clicked */}
      {showVideo && (
        <video id="hyperspace-video" autoPlay muted>
          <source
            src="src/assets/hyperspace.mp4" // Hyperspace video
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Only show the main content when the hyperspace video is not showing */}
      {!showVideo && (
        <>
          <div className="content">
            <div className="space-dna">
              <h1 className="left">
                <svg className="w-full h-full  " viewBox="0 0 300 100">
                  <text x="10" y="60" className="line-drawing ">
                    Space
                  </text>
                </svg>
              </h1>
              <h1 className="right">
                <svg className="w-full h-full" viewBox="0 0 300 100">
                  <text x="10" y="60" className="line-drawing p-4">
                    DNA
                  </text>
                </svg>
              </h1>
            </div>
          </div>

          <div className="Bottom">
            <div className="Bottom1">
              <h1>"Space is to place as eternity is to time"</h1>
            </div>
            <div className="Bottom2">
              <Astronaut />
            </div>
            <div className="Bottom3">
              <button
                onClick={handleExploreClick}
                className="relative px-6 py-3 font-bold text-white group"
              >
                <a
                  href="#_"
                  class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
                >
                  <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                  <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                    Explore
                  </span>
                  <span class="absolute inset-0 border-2 border-white rounded-full"></span>
                </a>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
