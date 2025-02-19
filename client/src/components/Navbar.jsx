import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Popover,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/auth-slice";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBridalDropdownOpen, setIsBridalDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileBridalOpen, setMobileBridalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/bridal", hasDropdown: true },
    { name: "Consultations", path: "/consultations" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };


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
              {link.name === "Gallery" && <ExpandMore className="ml-2 !text-[16px]" />}
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
      <div>
        {user ? (
          <IconButton
            className="!hidden md:!block"
            onClick={handleProfileClick}
          >
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
          </IconButton>
        ) : (
          <IconButton
            className="!hidden md:!block"
            onClick={handleProfileClick}
          >
            <AccountCircleIcon
              sx={{
                fontSize: "40px",
              }}
            />
          </IconButton>
        )}

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {user ? (
            <div className="!p-2 px-4 w-[140px]">
              <NavLink to="/">
                {}
                <MenuItem
                  onClick={() => {
                    handleProfileClose(), handleLogout();
                  }}
                  className="!text-[11px] "
                >
                  <AiOutlineLogout className="!mr-2 !text-[14px]" />{" "}
                  {/* Icon for SIGN UP */}
                  LOGOUT
                </MenuItem>
              </NavLink>
            </div>
          ) : (
            <div className="!p-2 px-4 w-[140px]">
              <NavLink to="/sign-up">
                {}
                <MenuItem
                  onClick={handleProfileClose}
                  className="!text-[11px] !border-b !border-gray-100"
                >
                  <AiOutlineUserAdd className="!mr-2 !text-[14px]" />{" "}
                  {/* Icon for SIGN UP */}
                  SIGN UP
                </MenuItem>
              </NavLink>
              <NavLink to="/login">
                <MenuItem onClick={handleProfileClose} className="!text-[11px]">
                  <AiOutlineLogin className="!mr-2 !text-[14px]" />{" "}
                  {/* Icon for LOGIN */}
                  LOGIN
                </MenuItem>
              </NavLink>
            </div>
          )}
        </Popover>
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
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <div className="w-64 h-[90%]">
          {/* Close Button */}
          <div className="w-full flex justify-end">
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="flex flex-col justify-between h-full">
            <List>
              {navLinks.map((link) => (
                <div key={link.name}>
                  <ListItem
                    button
                    component={NavLink}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemText
                      primaryTypographyProps={{ style: { fontSize: "14px" } }}
                      primary={link.name}
                    />
                  </ListItem>
                  {link.hasDropdown && (
                    <>
                      <ListItem
                        button
                        onClick={() => setMobileBridalOpen(!mobileBridalOpen)}
                      >
                        <ListItemText
                          primary="Bridal"
                          primaryTypographyProps={{
                            style: { fontSize: "14px" },
                          }}
                        />
                        {mobileBridalOpen ? <ExpandLess className="!text-[16px]" /> : <ExpandMore className="!text-[16px]"  />}
                      </ListItem>
                      <Collapse
                        in={mobileBridalOpen}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            component={NavLink}
                            to="/valorous"
                            onClick={() => setMobileOpen(false)}
                          >
                            <ListItemText
                              primary="Valorous 2024"
                              className="!pl-3"
                              primaryTypographyProps={{
                                style: { fontSize: "13px" },
                              }}
                            />
                          </ListItem>
                          <ListItem
                            button
                            component={NavLink}
                            to="/bridal"
                            onClick={() => setMobileOpen(false)}
                          >
                            <ListItemText
                              primary="2023 Bridal"
                              className="!pl-3"
                              primaryTypographyProps={{
                                style: { fontSize: "13px" },
                              }}
                            />
                          </ListItem>
                        </List>
                      </Collapse>
                    </>
                  )}
                </div>
              ))}
            </List>
            {user ? (
              <Button
                className="!normal-case !bg-[#d3a202] !text-white w-[120px] !ml-2"
                onClick={() => {
                  setMobileOpen(false), handleLogout();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="!normal-case !bg-[#d3a202] !text-white w-[120px] !ml-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
