import React, { useEffect, useState } from "react";
import RecImg1 from "../assets/home/rec-1.jpg";
import RecImg2 from "../assets/home/rec-2.jpg";
import RecImg3 from "../assets/home/rec-3.jpg";
import RecImg4 from "../assets/home/rec-4.jpg";
import RecImg5 from "../assets/home/rec-5.jpg";
import RecImg6 from "../assets/home/rec-6.jpg";
import RecImg7 from "../assets/home/rec-7.jpg";
import RecImg8 from "../assets/home/rec-8.jpg";
import RecImg9 from "../assets/home/rec-9.jpg";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";

const ImageSlider = () => {
  const imageArr = [
    RecImg1,
    RecImg8,
    RecImg2,
    RecImg3,
    RecImg4,
    RecImg5,
    RecImg6,
    RecImg7,
    RecImg9,
  ];
  const [midImage, setMidImage] = useState(0);
  const [rightImage, setRightImage] = useState(1);
  const [leftImage, setLeftImage] = useState(imageArr.length - 1);

  useEffect(() => {
    if (midImage === 0) {
      setLeftImage(imageArr.length - 1);
      setRightImage(1);
    } else if (midImage === imageArr.length - 1) {
      setRightImage(0);
      setLeftImage(midImage - 1);
    } else {
      setRightImage(midImage + 1);
      setLeftImage(midImage - 1);
    }
  }, [midImage]);

  const decrement = () => {
    if (midImage == imageArr.length - 1) {
      setMidImage(0);
    } else {
      setMidImage(midImage + 1);
    }
  };

  const increment = () => {
    if (midImage == 0) {
      setMidImage(imageArr.length - 1);
    } else {
      setMidImage(midImage - 1);
    }
  };

  return (
    <div>
      <div>
        <div className="h-[500px] flex items-center justify-center">
          <img
            src={imageArr[leftImage]}
            alt="rec-images"
            className="w-[200px] h-[300px] object-cover rounded-[10px] left-img "
          />
          <img
            src={imageArr[midImage]}
            alt="rec-images"
            className="lg:!w-[350px] w-full !h-[450px] object-cover rounded-[15px] shadow-[0px_0px_50px_1px_rgba(0,0,0,0.5)] mid-img"
          />
          <img
            src={imageArr[rightImage]}
            alt="rec-images"
            className="w-[200px] h-[300px] object-cover rounded-[10px] right-img"
          />
        </div>
        <div className="flex items-center justify-center gap-1 !my-2">
          {imageArr.map((_, index) => (
            <div
              className={`h-[8px] w-[8px] rounded-full  ${
                index === midImage ? "bg-[#d3a202]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <IconButton className="!bg-gray-200" onClick={decrement}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton className="!bg-gray-200" onClick={increment}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
