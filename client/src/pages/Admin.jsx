import React from "react";
import SideBar from "../components/admin/SideBar";
import AdminContent from "../components/admin/AdminContent";

const Admin = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <AdminContent />
    </div>
  );
};

export default Admin;
