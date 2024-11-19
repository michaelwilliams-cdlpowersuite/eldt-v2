import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ReactNode } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
    icon: <CalendarTodayIcon />,
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
    icon: <ForumIcon />,
    subNav: [
      {
        label: "All",
      },
    ],
  },
  {
    label: "Testing Schedule",
    path: "",
    icon: <CalendarTodayIcon />,
  },
  {
    label: "Quizzes",
    path: "",
    icon: <CheckCircleIcon />,
  },
  {
    label: "Safety History",
    path: "",
    icon: <SearchIcon />,
  },
  {
    label: "Leads",
    path: "",
    icon: <StarIcon sx={{ color: "#dee07f" }} />,
  },
  {
    label: "Analytics",
    path: "",
    icon: <TrendingUpIcon />,
  },
];

export default mainNavItems;
