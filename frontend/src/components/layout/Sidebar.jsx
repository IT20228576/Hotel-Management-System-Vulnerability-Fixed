import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BedIcon from "@mui/icons-material/Bed";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const Sidebar = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <ManageAccountsIcon />,
  },
  {
    title: "Rooms",
    path: "/viewRooms",
    icon: <BedIcon />,
  },
  {
    title: "Events",
    path: "/view",
    icon: <PhotoCameraBackIcon />,
  },
  {
    title: "Reservations",
    path: "/reservations",
    icon: <CalendarMonthIcon />,
  },
];
