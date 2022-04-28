import React from "react";
import "./sidebar.css";
import { IoWaterOutline } from "react-icons/io5";
import { routes } from "../../constants/routes";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { BiLogOutCircle } from "react-icons/bi";

interface props {
  toggleSidebar: boolean;
}

const Sidebar: React.FC<props> = ({ toggleSidebar }) => {
  const location = useLocation();
  const activeItem = routes.findIndex(
    (routeItem) => routeItem.route === location.pathname
  );

  return (
    <div
      className={` ${
        toggleSidebar ? "show__sidebar sidebar" : "sidebar"
      } flex flex-col items-center justify-between`}
    >
      <div>
        <div className="mt-3 mb-10 flex justify-center">
          <IoWaterOutline className="w-10 h-10 text-[#6969de]" />
        </div>

        {/* links */}
        {routes.map((route, index) => (
          <Link to={route.route} key={index}>
            <SidebarItem
              display_name={route.display_name}
              icon={route.icon}
              toggleSidebar={toggleSidebar}
              active={index === activeItem}
            />
          </Link>
        ))}
      </div>

      <div className="">
        <Link
          to="#"
          className="flex mb-10 w-full justify-center gap-3 items-center text-[#ef4b4b]"
        >
          <BiLogOutCircle className="w-6 h-6" />
          <span
            className={`${
              toggleSidebar ? "lg:inline-block" : "hidden"
            }  text-lg col-span-3 hidden`}
          >
            Log Out
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
