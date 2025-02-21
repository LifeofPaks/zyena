import React from "react";
import {  NavLink } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSidebarStore } from "../zustand/useSideBar";
import ProfileIcon from "./ProfileIcon";

const Sidebar = () => {
  const {
    mobileOpen,
    setMobileOpen,
    mobileBridalOpen,
    setMobileBridalOpen,
  } = useSidebarStore();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/bridal", hasDropdown: true },
    { name: "Consultation", path: "/consultation" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
    >
      <div className="w-64 h-[90%]">
        <div className="w-full flex justify-end">
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon className="!text-[16px]" />
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
                      {mobileBridalOpen ? (
                        <ExpandLess className="!text-[16px]" />
                      ) : (
                        <ExpandMore className="!text-[16px]" />
                      )}
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
        <ProfileIcon/>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
