import React from "react";
import {  useNavigate } from "react-router-dom";
import { HiCalendarDateRange } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { Button } from "@mui/material";
import { logoutUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { useAdminSidebarStore } from "../../zustand/useAdminSidebarStore";
import { IoIosMail } from "react-icons/io";
import Logo from "../Logo";

const SideBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useAdminSidebarStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;

  console.log("isSidebarOpen: ", isSidebarOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdDashboard className="!text-[18px]" />,
    },
    {
      id: "consultations",
      label: "Consultations",
      path: "/admin/consultations",
      icon: <HiCalendarDateRange className="w-[20px]" />,
    },
    {
      id: "contacts",
      label: "Contacts",
      path: "/admin/contacts",
      icon: <IoIosMail className="!text-[18px]" />,
    },
  ];

  return (
    <div
      className={` !flex flex-col items-start !w-[300px] border-r border-gray-200 h-screen !py-6 `}
    >
      <div className="!ml-4">
        <Logo />
      </div>

      <div className="flex flex-col h-[98%] justify-between !pb-[3rem]">
        <nav className="!mt-6 flex-col flex gap-2 ">
          {adminSidebarMenuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              onClick={() => {
                navigate(menuItem.path);
                setIsSidebarOpen(false);
              }}
              className={`!flex cursor-pointer !mb-1 text-xl !items-center !gap-1 !pl-3 !pr-3 !border-l-4 !transition-colors !duration-200 ${
                currentPath === menuItem.path
                  ? "text-[#212020] !border-[#008080]"
                  : "text-gray-400 border-transparent hover:text-[#212020]"
              }`}
            >
              <div
                className={`${
                  currentPath === menuItem.path
                    ? "text-[#008080]"
                    : "text-inherit"
                }`}
              >
                {menuItem.icon}
              </div>
              <p className="text-[13px] font-semibold ">
                {menuItem.label}
              </p>
            </div>
          ))}
        </nav>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="!normal-case !bg-red-700 !text-white !w-[120px] !ml-4"
        >
          <AiOutlineLogout className="!mr-1 !text-[15px]" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
