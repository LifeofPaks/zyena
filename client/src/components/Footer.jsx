import React from "react";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const getCurrentYear = new Date().getFullYear();
  return (
    <div className="bg-black text-gray-400 ">
      <div className="container !mx-auto !py-4">
      <div className="flex flex-col-reverse items-center justify-center lg:flex-row lg:justify-between gap-3">
          <p className="text-[11px] lg:text-[12px]  !font-semibold">
            © Copyright <span>{getCurrentYear}</span> Zyena. All rights
            Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link>
              <FaFacebookF className="text-[18px]"/>
            </Link>
            <Link>
              <FaTiktok className="text-[18px]"/>
            </Link>
            <Link>
              <FaInstagram className="text-[18px]"/>
            </Link>
          </div>
        </div>
      <h1 className="text-[6rem] lg:text-[10rem]  w-full text-center outline-font">ZYENA</h1>
      </div>
    </div>
  );
};

export default Footer;
