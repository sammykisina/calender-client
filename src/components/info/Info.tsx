import React from "react";
import TodayEvent from "./TodayEvent";

const Info: React.FC = () => {
  return (
    <div className="hidden md:block md:w-[350px] h-[730px] bg-white rounded-3xl mx-2 border">
      {/* todays Events */}
      <TodayEvent />
    </div>
  );
};

export default Info;
