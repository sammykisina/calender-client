import React from "react";
import TodayEvent from "../info/TodayEvent";
import "./widget.css";

interface props {
  toggleWidget: boolean;
}

const Widget: React.FC<props> = ({ toggleWidget }) => {
  return (
    <div className={` ${toggleWidget ? "show__widget widget" : "widget"}`}>
      <TodayEvent />
    </div>
  );
};

export default Widget;
