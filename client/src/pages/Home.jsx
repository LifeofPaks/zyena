import React from "react";
import HeroVideo from "../assets/video-sample.mp4";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScrollText from "../components/ScrollText";
import AboutUs from "../components/home/AboutUs";
import Specials from "../components/home/Specials";
import Testimonials from "../components/home/Testimonials";
import Recommended from "../components/home/Recommended";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <ScrollText />
      <div className="relative w-full h-[90vh]">
        <video
          src={HeroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center  w-full !mx-auto gap-4 ">
          <h1 className="inset-0 flex items-center justify-center text-white w-full text-[1.9rem] lg:text-[64px] lg:w-[1000px] !mx-auto text-center drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)] playfair">
            Timeless elegance, crafted for your perfect moment
          </h1>

          <Button
            onClick={() => navigate("/appointment")}
            variant="contained"
            className="lg:!text-[14px] !text-[12px] !rounded-none !mt-8 lg:!py-[10px] !px-4 group !bg-[#d3a202] !text-white !font-normal transition-transform duration-300 ease-in-out  hover:scale-105 animate-bounce group-hover:animate-none"
          >
            Book an appointment
          </Button>
        </div>
      </div>
      <AboutUs />
      <Specials/>
      <Testimonials/>
      <Recommended/>
    </div>
  );
};
