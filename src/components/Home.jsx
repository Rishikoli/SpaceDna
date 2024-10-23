import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Header from "./Header";
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
              <h1 className="left">SPACE</h1>
              <h1 className="right">DNA</h1>
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
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-blue-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-white"></span>
                <span className="relative">Explore</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
