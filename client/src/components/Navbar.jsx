import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  IconButton,
  Popover,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MdDashboard } from "react-icons/md";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/auth-slice";
import { useSidebarStore } from "../zustand/useSideBar";
import Sidebar from "./Sidebar";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    isBridalDropdownOpen,
    setIsBridalDropdownOpen,
    mobileOpen,
    setMobileOpen,
    anchorEl,
    setAnchorEl,
  } = useSidebarStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/bridal", hasDropdown: true },
    { name: "Consultation", path: "/consultation" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];


  return (
    <nav className="container flex items-center justify-between !mx-auto !py-1">
      <Link to="/">
        <img
          className="!ml-2 lg:ml-0"
          width="35"
          height="35"
          src="https://img.icons8.com/ios-filled/50/panopto.png"
          alt="panopto"
        />
      </Link>

      {/* Web Navbar - Hidden on Mobile */}
      <div className="!hidden md:!flex items-center gap-8 !p-4">
        {navLinks.map((link) => (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
            onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
          >
            <NavLink
              to={link.path}
              onMouseEnter={() => setIsBridalDropdownOpen(false)}
              className={({ isActive }) =>
                `relative text-black text-sm transition-all duration-300 
                 after:content-[''] after:absolute after:left-1/2 after:w-0 
                 after:h-[2px] after:bg-blue-500 after:transition-all 
                 after:duration-300 after:top-full hover:after:w-full hover:after:left-0
                 ${
                   isActive ? "text-blue-500" : "hover:text-blue-500"
                 } block h-[30px]`
              }
            >
              {link.name}
              {link.name === "Gallery" && (
                <ExpandMore className="ml-2 !text-[16px]" />
              )}
            </NavLink>

            {/* Web Dropdown */}
            {link.hasDropdown && isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border-t-2 border-blue-500 top-[2rem]">
                <NavLink
                  to="#"
                  className="!px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out flex items-center text-[13px] border-b border-gray-200"
                  onMouseEnter={() => setIsBridalDropdownOpen(true)}
                >
                  Bridal <MdOutlineKeyboardArrowRight className="ml-auto" />
                </NavLink>

                {isBridalDropdownOpen && (
                  <div className="absolute left-full top-0 mt-2 w-48 bg-white shadow-lg rounded-lg border-t-2 border-blue-500">
                    <NavLink
                      to="/valorous"
                      className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] border-b border-gray-200"
                    >
                      Valorous 2024
                    </NavLink>
                    <NavLink
                      to="/bridal"
                      className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] border-b border-gray-200"
                    >
                      2023 Bridal
                    </NavLink>
                  </div>
                )}
                <NavLink
                  onMouseEnter={() => setIsBridalDropdownOpen(false)}
                  to="/prom-dresses"
                  className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] border-b border-gray-200"
                >
                  Prom Dresses
                </NavLink>
                <NavLink
                  onMouseEnter={() => setIsBridalDropdownOpen(false)}
                  to="/evening-dresses"
                  className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] border-b border-gray-200"
                >
                  Evening Dresses
                </NavLink>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Profile Icon & Popover */}
      <div className="!hidden md:!block">

     <ProfileIcon/>
      </div>

      {/* Mobile Navbar Button */}
      {!mobileOpen && (
        <IconButton
          className="block lg:!hidden !mr-2"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      <Sidebar/>
    </nav>
  );
};

export default Navbar;
