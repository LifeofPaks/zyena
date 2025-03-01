import React from "react";
import ImageSlider from "../ImageSlider";

const Recommended = () => {
  return (
    <div className="container !mx-auto !pt-4 !pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="flex !items-center gap-2 !mb-[1rem]">
          <h1 className="lg:!text-[24px] !text-[20px] uppercase playfair font-[500] ">
            recommended
          </h1>
          <div className="w-[100px] h-[1px] bg-[#999898]"></div>
        </div>

        <div>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default Recommended;
