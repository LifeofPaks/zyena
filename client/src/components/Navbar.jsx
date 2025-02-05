import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBridalDropdownOpen, setIsBridalDropdownOpen] = useState(false); // Track Bridal dropdown

  return (
    <nav className="container flex items-center justify-between !mx-auto ">
      <Link to="/">
        <img
          className="text-red-600"
          width="35"
          height="35"
          src="https://img.icons8.com/ios-filled/50/panopto.png"
          alt="panopto"
        />
      </Link>
      <div className="flex items-center gap-8 p-4">
        {[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/bridal", hasDropdown: true },
          { name: "Consultations", path: "/consultations" },
          { name: "Shop", path: "/shop" },
          { name: "About Us", path: "/about-us" },
          { name: "Contact Us", path: "/contact-us" },
        ].map((link) => (
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
                `relative  text-black text-sm transition-all duration-300 after:content-[''] after:absolute after:left-1/2 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:top-full hover:after:w-full hover:after:left-0 
    ${isActive ? "text-blue-500" : "hover:text-blue-500"}
    block h-[30px]`
              }
            >
              {link.name}
            </NavLink>

            {/* Dropdown Menu for Gallery */}
            {link.hasDropdown && isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg !border-t-2 border-blue-500 top-[2rem]">
                <NavLink
                  to="#"
                  className="!px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out flex items-center text-[13px]"
                  onMouseEnter={() => setIsBridalDropdownOpen(true)}
                >
                  Bridal <MdOutlineKeyboardArrowRight className="!ml-[6rem]" />
                </NavLink>

                {/* Nested Bridal Dropdown */}
                {isBridalDropdownOpen && (
                  <div className="absolute left-full top-0 mt-2 w-48 bg-white shadow-lg rounded-lg !border-t-2 border-blue-500">
                    <NavLink
                      to="/valorous"
                      className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] tracking-wide border-b border-gray-200"
                    >
                      Valorous 2024
                    </NavLink>
                    <NavLink
                      to="/bridal"
                      className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] tracking-wide border-b border-gray-200"
                    >
                      2023 Bridal
                    </NavLink>
                  </div>
                )}
                <NavLink
                  onMouseEnter={() => setIsBridalDropdownOpen(false)}
                  to="/prom-dresses"
                  className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] tracking-wide border-b border-gray-200"
                >
                  Prom Dresses
                </NavLink>
                <NavLink
                  onMouseEnter={() => setIsBridalDropdownOpen(false)}
                  to="/evening-dresses"
                  className="block !px-4 !py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-500 transition-all duration-300 ease-in-out text-[13px] tracking-wide border-b border-gray-200"
                >
                  Evening Dresses
                </NavLink>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
