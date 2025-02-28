import { Link, NavLink } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSidebarStore } from "../zustand/useSideBar";
import Sidebar from "./Sidebar";
import ProfileIcon from "./ProfileIcon";
import Logo from "./Logo";

const Navbar = () => {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    isBridalDropdownOpen,
    setIsBridalDropdownOpen,
    mobileOpen,
    setMobileOpen,
  } = useSidebarStore();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/our-story" },
    { name: "Testimonials", path: "/testimonial" },
    { name: "Gallery", path: "/valorous", hasDropdown: true },
    { name: "Shop", path: "/shop" },
    { name: "Appointment", path: "/appointment" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <nav className="container flex items-center justify-between !mx-auto !py-1">
      <div className="!ml-4 lg:ml-0">
        <Logo />
      </div>

      {/* Web Navbar - Hidden on Mobile */}
      <div className="!hidden md:!flex items-center gap-8 !p-4">
        {navLinks.map((link) => (
          <div
            key={link.name}
            className="relative uppercase font-semibold"
            onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
            onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
          >
            <NavLink
              to={link.path}
              onMouseEnter={() => setIsBridalDropdownOpen(false)}
              className={({ isActive }) =>
                `relative text-black text-[12px] transition-all duration-300 
                 after:content-[''] after:absolute after:left-1/2 after:w-0 
                 after:h-[2px] after:bg-black after:transition-all 
                 after:duration-300 after:top-full hover:after:w-full hover:after:left-0
                 ${
                   isActive ? "text-gray-500" : "hover:text-gray-500"
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
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border-t-2 border-black top-[2rem] z-50">
                <NavLink
                  to="#"
                  className="!px-4 !py-2  hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 ease-in-out flex items-center text-[11px] border-b border-gray-200"
                  onMouseEnter={() => setIsBridalDropdownOpen(true)}
                >
                  Bridal <MdOutlineKeyboardArrowRight className="ml-auto" />
                </NavLink>

                {isBridalDropdownOpen && (
                  <div className="absolute left-full top-0 mt-2 w-48 bg-white shadow-lg border-t-2 border-black">
                    <NavLink
                      to="/valorous"
                      className="block !px-4 !py-2  hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 ease-in-out text-[11px] border-b border-gray-200"
                    >
                      Valorous 2024
                    </NavLink>
                    <NavLink
                      to="/bridal"
                      className="block !px-4 !py-2  hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 ease-in-out text-[11px] border-b border-gray-200"
                    >
                      2023 Bridal
                    </NavLink>
                  </div>
                )}
                <NavLink
                  onMouseEnter={() => setIsBridalDropdownOpen(false)}
                  to="/prom-dresses"
                  className="block !px-4 !py-2  hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 ease-in-out text-[11px] border-b border-gray-200"
                >
                  Prom Dresses
                </NavLink>
                <NavLink
                  onMouseEnter={() => setIsBridalDropdownOpen(false)}
                  to="/evening-dresses"
                  className="block !px-4 !py-2  hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 ease-in-out text-[11px] border-b border-gray-200"
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
        <ProfileIcon />
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
      <Sidebar />
    </nav>
  );
};

export default Navbar;
