import React, { ReactElement } from "react";

interface props {
  display_name: string;
  icon: ReactElement<any, any>;
  toggleSidebar: boolean;
  active: boolean;
}

const SidebarItem: React.FC<props> = ({
  display_name,
  icon,
  toggleSidebar,
  active,
}) => {
  return (
    <div
      className={`flex justify-center items-center ${
        toggleSidebar ? "lg:grid" : "flex"
      } sidebarItem`}
    >
      <div
        className={`col-span-2 flex justify-center ${
          active ? "text-[#6969de]" : ""
        } `}
      >
        {" "}
        {icon}
      </div>
      <span
        className={`${
          toggleSidebar ? "lg:inline-block" : "hidden"
        }  text-lg col-span-3 hidden ${active ? "text-[#6969de]" : ""}`}
      >
        {display_name}
      </span>
    </div>
  );
};

export default SidebarItem;
