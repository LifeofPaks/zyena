import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AboutImg from "../../assets/home/our-story.png";
import LayerImg from "../../assets/home/layer.png";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="container !mx-auto !py-30">
      <div className="flex justify-betweeen items-center gap-[4rem]">
        <div>
          <div className="flex !items-center gap-2 !mb-[1rem]">
            <h1 className="!text-[24px] uppercase playfair font-[500] ">
              About us
            </h1>
            <div className="w-[100px] h-[1px] bg-[#999898]"></div>
          </div>
          <p className="w-[570px] text-[18px] text-[#5F5F5F]">
            Our dresses are meticulously constructed by creating fresh patterns
            for each client, using their accurate body measurement, providing a
            flawless fit that celebrates your body’s uniqueness. Our dresses
            feature built-in corsets, eliminating the need for wearing Bra or
            any other undergarments, and ensuring comfort and support for all
            body shapes and sizes
          </p>

          <Button
            onClick={() => navigate("/our-story")}
            variant="contained"
            className="!text-[14px] !rounded-none !mt-[2rem] !px-6 group !bg-[#d3a202] !text-white !font-normal"
          >
            read more
          </Button>
        </div>

        <div className="relative w-full h-full">
          <img
            src={LayerImg}
            alt="hero-image"
            className="relative top-0 left-6 w-full h-auto"
          />
          <img
            src={AboutImg}
            alt="hero-image"
            className="absolute top-6 left-0 w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
