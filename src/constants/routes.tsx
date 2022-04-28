import { AiOutlinePieChart } from "react-icons/ai";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineChartSquareBar } from "react-icons/hi";

export const routes = [
  {
    display_name: "Dashboard",
    route: "/",
    icon: <AiOutlinePieChart className="sidebar__icon" />,
  },
  {
    display_name: "Calender",
    route: "/calender",
    icon: <IoCalendarOutline className="sidebar__icon" />,
  },
  {
    display_name: "Activities",
    route: "/activities",
    icon: <FiActivity className="sidebar__icon" />,
  },
  {
    display_name: "Messages",
    route: "/messages",
    icon: <BiMessageSquareDetail className="sidebar__icon" />,
  },
  {
    display_name: "Project Plan",
    route: "/project-plan",
    icon: <HiOutlineChartSquareBar className="sidebar__icon" />,
  },
  {
    display_name: "Settings",
    route: "/settings",
    icon: <IoSettingsOutline className="sidebar__icon" />,
  },
];
