import React from "react";
import Header from "./Header";
import "./Home.css";
import Astronaut from "./Astronaut";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <video id="background-video" autoPlay muted loop>
        <source
          src="src/assets/Interstellar Gargantua black hole 4K live wallpaper for free windows 7810111080p60.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="space-dna">
          <h1 className="left">SPACE</h1>
          <h1 className="right">DNA</h1>
        </div>
      </div>
      <div class="Bottom">
        <div class="Bottom1">
          <h1>"Space is to place as eternity is to time"</h1>
        </div>
        <div class="Bottom2">
          <Astronaut />
        </div>
        <div class="Bottom3">
          <a href="#_" class="relative px-6 py-3 font-bold text-white group">
            <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-blue-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span class="absolute inset-0 w-full h-full border-4 border-white"></span>
            <span class="relative">Explore</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
