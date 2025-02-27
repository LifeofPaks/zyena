import React from "react";
import HeroVideo from "../assets/video-sample.mp4";

export const Home = () => {
  return (
    <div className="min-h-screen">
      <div>
        <video src={HeroVideo} autoPlay muted loop className="w-full h-[90vh] object-cover relative"/>
      </div>
    </div>
  );
};
