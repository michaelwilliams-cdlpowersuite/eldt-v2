// src/config/mainNavItems.js
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ReactNode } from "react";

export interface NavItemsProps {
  label: string;
  path?: string;
  icon?: ReactNode;
  subnav?: NavItemsProps[];
}

const mainNavItems = [
  {
    label: "Students",
    path: "/students",
    icon: <PersonIcon />,
    subNav: [
      {
        label: "All",
      },
      {
        label: "Current",
      },
      {
        label: "Submitted",
      },
      {
        label: "Incomplete",
      },
      {
        label: "Completed",
      },
    ],
  },
  {
    label: "Schedule",
    path: "/schedule",
    icon: <CalendarMonthIcon />,
    subNav: [
      {
        label: "Upcoming",
      },
      {
        label: "Monday Start",
      },
      {
        label: "Hazmat",
      },
    ],
  },
  {
    label: "Daily Planner",
    path: "/daily-planner",
    icon: <LocalShippingIcon />,
  },
  {
    label: "Conversations",
    path: "",
  },
  {
    label: "Testing Schedule",
    path: "",
  },
  {
    label: "Quizzes",
    path: "",
  },
  {
    label: "Safety History",
    path: "",
  },
  {
    label: "Leads",
    path: "",
  },
  {
    label: "Analytics",
    path: "",
  },
];

export default mainNavItems;
