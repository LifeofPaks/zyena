import React from "react";
import BridalImg from "../../assets/home/bridal.png";
import PromImg from "../../assets/home/prom.png";
import EveningImg from "../../assets/home/evening.png";
import { Link } from "react-router-dom";

const Specials = () => {
  return (
    <div className="container !mx-auto !pt-4 !pb-12">
      <div className="lg:!px-0 !px-6">
        <div className="flex !items-center gap-2 !mb-[1rem] w-full justify-center ">
          <div className="w-[80px] lg:w-[100px] h-[1px] bg-[#999898]"></div>
          <h1 className="lg:!text-[24px] !text-[18px] uppercase playfair font-[500] ">
            OUR SPECIALITIES
          </h1>
          <div className="w-[80px] lg:w-[100px] h-[1px] bg-[#999898]"></div>
        </div>

        <div className="flex flex-col lg:flex-row !mt-12 items-center gap-4">
          <Link to='bridal'>
            <img src={BridalImg} alt="special-img" />
          </Link>
          <Link to="prom-dresses">
            <img src={PromImg} alt="special-img" />
          </Link>
          <Link to="evening-dresses">
            <img src={EveningImg} alt="special-img" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Specials;
