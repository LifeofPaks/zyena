import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MdDashboard } from "react-icons/md";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { IconButton, Popover, MenuItem, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/auth-slice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSidebarStore } from "../zustand/useSideBar";

const ProfileIcon = () => {
  const {
    setMobileOpen,
    anchorEl,
    setAnchorEl,
  } = useSidebarStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <IconButton  onClick={handleProfileClick}>
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
        <IconButton onClick={handleProfileClick}>
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
        PaperProps={{
            elevation: 2, 
            sx: { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }, 
          }}
      >
        {user ? (
          <div className="!p-1 px-4 w-[140px]" onClick={() => setMobileOpen(false)}>
            {user.role === "admin" && (
              <MenuItem
                onClick={() => {
                  navigate("/admin/dashboard");
                  handleProfileClose()
                }}
                className="!text-[11px] !py-3 !border-b !border-gray-100"
              >
                <MdDashboard className="!mr-1 !text-[14px] !text-gray-500" />{" "}
                {/* Icon for SIGN UP */}
                DASHBOARD
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                handleProfileClose(), handleLogout();
                navigate("/");
              }}
              className="!text-[11px] !py-3 "
            >
              <AiOutlineLogout className="!mr-1 !text-[14px]" />{" "}
              {/* Icon for SIGN UP */}
              LOGOUT
            </MenuItem>
          </div>
        ) : (
          <div className="!p-1 w-[140px]" onClick={() => setMobileOpen(false)}>
            <NavLink to="/sign-up">
              {}
              <MenuItem
                onClick={handleProfileClose}
                className="!text-[11px] !py-3 !border-b !border-gray-100 "
              >
                <AiOutlineUserAdd className="!mr-1 !text-[14px]" />{" "}
                {/* Icon for SIGN UP */}
                SIGN UP
              </MenuItem>
            </NavLink>
            <NavLink to="/login">
              <MenuItem onClick={handleProfileClose} className="!text-[11px] !py-3">
                <AiOutlineLogin className="!mr-1 !text-[14px]" />{" "}
                {/* Icon for LOGIN */}
                LOGIN
              </MenuItem>
            </NavLink>
          </div>
        )}
      </Popover>
    </div>
  );
};

export default ProfileIcon;
