import React from "react";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
    <div className="bg-black text-gray-400 ">
      <div className="container !mx-auto !py-4 !pt-10">
        <div className="flex flex-col lg:items-start  justify-center lg:flex-row lg:justify-between gap-6 lg:!px-0 !px-6">
          <p className=" text-[13px] lg:text-[14px] lg:w-[280px] w-full lg:!leading-[30px]">
            At Zyena, our passion lies in creating high-quality fashion with
            empowering designs that combine style, elegance, and comfort.
          </p>

          <div>
            <div className="flex  items-center gap-1 text-[12px] lg:text-[13px] !mb-2">
              <CiMail className="text-[17px]" />
              <span className="!font-semibold">Emai: </span> info@zyena.co
            </div>
            <div className="flex  items-center gap-1 text-[12px] lg:text-[13px] !mb-2">
              <PiPhoneLight className="text-[17px]" />{" "}
              <span className="!font-semibold"> Phone:</span> +1 862 684 2601
            </div>
            <div className="flex  items-center gap-1 text-[12px] lg:text-[13px] !mb-2">
              <CiLocationOn className="text-[17px]" />{" "}
              <span className="!font-semibold">Address: </span> Newark, New
              Jersey, United States.
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <Link>
              <FaFacebookF className="text-[18px]" />
            </Link>
            <Link>
              <FaTiktok className="text-[18px]" />
            </Link>
            <Link>
              <FaInstagram className="text-[18px]" />
            </Link>
          </div>
        </div>
        <h1 className="text-[6rem] lg:text-[10rem]  w-full text-center outline-font">
          ZYENA
        </h1>
        <p className="text-[10px] lg:text-[11px] w-full text-center">
          © Copyright <span>{getCurrentYear}</span> Zyena. All rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
