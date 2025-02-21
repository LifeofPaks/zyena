import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  
  isDropdownOpen: false,
  setIsDropdownOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  isBridalDropdownOpen: false,
  setIsBridalDropdownOpen: (isOpen) => set({ isBridalDropdownOpen: isOpen }),

  mobileOpen: false,
  setMobileOpen: (isOpen) => set({ mobileOpen: isOpen }),

  mobileBridalOpen: false,
  setMobileBridalOpen: (isOpen) => set({ mobileBridalOpen: isOpen }),

  anchorEl: null,
  setAnchorEl: (el) => set({ anchorEl: el }),
}));
