import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const AdminContent = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <NavBar />
      <div className="bg-gray-50 flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminContent;
