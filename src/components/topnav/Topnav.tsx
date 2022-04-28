import React from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import "./topnav.css";
import Profile_pic from "../assets/images/profile_pic.jpg";
import { HiMenuAlt4 } from "react-icons/hi";

interface props {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;

  toggleWidget: boolean;
  setToggleWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topnav: React.FC<props> = ({
  toggleSidebar,
  setToggleSidebar,
  toggleWidget,
  setToggleWidget,
}) => {
  return (
    <div className="flex justify-between items-center sticky top-0 right-0  py-1 shadow-lg bg-white rounded-md border ">
      <div>
        {toggleSidebar ? (
          <BiX
            className="toggle__icon"
            onClick={() => setToggleSidebar(false)}
          />
        ) : (
          <BiMenu
            onClick={() => setToggleSidebar(true)}
            className="toggle__icon"
          />
        )}
      </div>

      <div className="flex items-center gap-2 px-2">
        <div className="ring-1 p-1  rounded-full  ring-[#444f63]">
          <FiBell className="w-5 h-5 text-gray-900" />
        </div>

        <div className="w-[30px] h-[30px] flex justify-center rounded-full overflow-hidden">
          <img src={Profile_pic} alt="" className="w-[40px]" />
        </div>

        <div className="p-2 md:hidden">
          {toggleWidget ? (
            <BiX
              className="w-5 h-5 text-gray-900"
              onClick={() => setToggleWidget(false)}
            />
          ) : (
            <HiMenuAlt4
              className="w-5 h-5 text-gray-900"
              onClick={() => setToggleWidget(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Topnav;
