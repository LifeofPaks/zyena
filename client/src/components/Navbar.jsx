import { Link, NavLink } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu on hover
  };

  const handleMouseLeave = () => {
    setAnchorEl(null); // Close the menu when mouse leaves
  };

  return (
    <nav className="container flex items-center justify-between !mx-auto shadow-md bg-white !py-2 !px-[2rem] rounded-2xl">
      <Link to="/">
        <img
          className="text-red-600"
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/panopto.png"
          alt="panopto"
        />
      </Link>
      <div className="flex items-center gap-8 p-4">
        {[
          { name: "Home", path: "/" },
          { name: "Consultations", path: "/consultations" },
          { name: "Shop", path: "/shop" },
          { name: "About Us", path: "/about-us" },
          { name: "Contact Us", path: "/contact-us" },
        ].map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `relative text-black transition-all duration-300 after:content-[''] after:absolute after:left-1/2 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:top-full hover:after:w-full hover:after:left-0 hover:after:scale-x-100 hover:after:left-0 ${
                isActive ? "text-blue-500" : "hover:text-blue-500"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {/* Gallery with Hover Effect */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <span className="text-black cursor-pointer">
            Gallery
          </span>
          {/* Dropdown Menu for Gallery */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMouseLeave}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <NavLink to="/prom-dresses">
              <MenuItem onClick={handleMouseLeave}>Prom Dresses</MenuItem>
            </NavLink>
            <NavLink to="/evening-dresses">
              <MenuItem onClick={handleMouseLeave}>Evening Dresses</MenuItem>
            </NavLink>
            <NavLink to="/bridal">
              <MenuItem onClick={handleMouseLeave}>Bridal</MenuItem>
            </NavLink>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
