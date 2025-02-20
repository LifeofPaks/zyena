import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
  PackageOpen,
} from "lucide-react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Button } from "@mui/material";
import { logoutUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <DashboardIcon className="!text-[18px]" />,
    },
    {
      id: "consultations",
      label: "Consultations",
      path: "/admin/consultations",
      icon: <ShoppingBasket className="w-[20px]" />,
    },
    {
      id: "contacts",
      label: "Contacts",
      path: "/admin/contacts",
      icon: <LocalMallIcon className="!text-[18px]" />,
    },
  ];

  return (
    <div className="w-[300px] border-r border-gray-200 h-screen !p-4 hidden lg:block">
      <Link to="/" className="flex items-center">
        <img
          className="!ml-2 lg:ml-0"
          width="35"
          height="35"
          src="https://img.icons8.com/ios-filled/50/panopto.png"
          alt="panopto"
        />
        <p className="font-bold text-[14px]">Zyena</p>
      </Link>

      <div className="flex flex-col h-[98%] justify-between !pb-[3rem]">
        <nav className="!mt-6 flex-col flex gap-2 ">
          {adminSidebarMenuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              onClick={() => {
                navigate(menuItem.path);
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
              <p className="text-[15px] font-semibold !pt-1">
                {menuItem.label}
              </p>
            </div>
          ))}
        </nav>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="!normal-case !bg-red-700 !text-white !w-[120px]"
        >
          <AiOutlineLogout className="!mr-1 !text-[15px]" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
