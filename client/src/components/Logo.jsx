import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../assets/zyena-logo.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center flex-col !ml-2 lg:ml-0">
      <img
        className=""
        width="35"
        height="35"
        src={LogoImage}
        alt="panopto"
      />
      <p className="font-bold uppercase text-[11px] tracking-widest">Zyena</p>
    </Link>
  );
};

export default Logo;
