import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="!px-6 !py-4 border-b border-gray-200 w-full flex items-center justify-between">
      <p className="!text-[13px]">
        Hello, Welcome back{" "}
        <span className="font-bold text-gray-500">{user.firstName}</span>
      </p>
      <div className="flex items-center gap-1">
        <Avatar
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            width: 40,
            height: 40,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          {user.firstName?.charAt(0).toUpperCase()}
        </Avatar>
        <div className="hidden lg:block">
          <p className="!text-[13px] text-gray-700"> {user.firstName}</p>
          <p className="!text-[13px] text-gray-700 capitalize font-bold">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
