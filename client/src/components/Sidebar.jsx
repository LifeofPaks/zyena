import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const { mobileOpen, setMobileOpen } = useSidebarStore();
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const [mobileBridalOpen, setMobileBridalOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/our-story" },
    { name: "Testimonials", path: "/testimonial" },
    {
      name: "Gallery",
      hasDropdown: true,
      subLinks: [
        {
          name: "Bridal",
          hasDropdown: true,
          subLinks: [
            { name: "Valorous 2024", path: "/valorous" },
            { name: "2023 Bridal", path: "/bridal" },
          ],
        },
        { name: "Prom Dresses", path: "/prom-dresses" },
        { name: "Evening Dresses", path: "/evening-dresses" },
      ],
    },
    { name: "Shop", path: "/shop" },
    { name: "Appointment", path: "/appointment" },

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
                  component={link.path ? NavLink : "div"}
                  to={link.path || ""}
                  onClick={() => {
                    if (!link.hasDropdown) setMobileOpen(false);
                    else setMobileGalleryOpen(!mobileGalleryOpen);
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: { fontSize: "14px" } }}
                    primary={link.name}
                  />
                  {link.hasDropdown &&
                    (mobileGalleryOpen ? (
                      <ExpandLess className="!text-[16px]" />
                    ) : (
                      <ExpandMore className="!text-[16px]" />
                    ))}
                </ListItem>

                {link.hasDropdown && (
                  <Collapse in={mobileGalleryOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {link.subLinks.map((subLink) => (
                        <div key={subLink.name}>
                          <ListItem
                            button
                            component={subLink.path ? NavLink : "div"}
                            to={subLink.path || ""}
                            onClick={() => {
                              if (!subLink.hasDropdown) setMobileOpen(false);
                              else setMobileBridalOpen(!mobileBridalOpen);
                            }}
                          >
                            <ListItemText
                              primaryTypographyProps={{
                                style: { fontSize: "13px", marginLeft: "10px" },
                              }}
                              primary={subLink.name}
                            />
                            {subLink.hasDropdown &&
                              (mobileBridalOpen ? (
                                <ExpandLess className="!text-[16px]" />
                              ) : (
                                <ExpandMore className="!text-[16px]" />
                              ))}
                          </ListItem>

                          {subLink.hasDropdown && (
                            <Collapse
                              in={mobileBridalOpen}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                {subLink.subLinks.map((nestedLink) => (
                                  <ListItem
                                    key={nestedLink.name}
                                    button
                                    component={NavLink}
                                    to={nestedLink.path}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    <ListItemText
                                      primaryTypographyProps={{
                                        style: { fontSize: "12px" },
                                      }}
                                      primary={nestedLink.name}
                                      className="!pl-6"
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          )}
                        </div>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>
          <ProfileIcon />
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
