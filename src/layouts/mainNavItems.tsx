// src/config/mainNavItems.js
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ReactNode } from "react";

export interface NavItemsProps {
  label: string;
  path: string;
  icon: ReactNode;
}

const mainNavItems = [
  {
    label: "Students",
    path: "/students",
    icon: <PersonIcon />,
  },
  {
    label: "Schedule",
    path: "/schedule",
    icon: <CalendarMonthIcon />,
  },
  {
    label: "Daily Planner",
    path: "/daily-planner",
    icon: <LocalShippingIcon />,
  },
];

export default mainNavItems;
