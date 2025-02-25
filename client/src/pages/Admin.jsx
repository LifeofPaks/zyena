import React, { useState } from "react";
import SideBar from "../components/admin/SideBar";
import AdminContent from "../components/admin/AdminContent";

const Admin = () => {
  return (
    <div className="flex w-full">
     <div className="lg:block hidden">
     <SideBar />
     </div>
      <AdminContent />
    </div>
  );
};

export default Admin;
