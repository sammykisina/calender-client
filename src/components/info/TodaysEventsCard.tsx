import React from "react";
import { Event } from "../../types";

interface props {
  todayEvent: Event;
  icon: string;
}

const TodaysEventsCard: React.FC<props> = ({ todayEvent, icon }) => {
  return (
    <div className="my-3 flex flex-row gap-2 border-b py-1 transition-all duration-[0.5s]">
      <div className="w-10 h-10 bg-[#f9f9fb] flex justify-center items-center rounded-xl">
        <img src={icon} alt="" className="w-6 h-6" />
      </div>

      <div className="flex flex-col ">
        <span className=" font-bold text-sm transition-all duration-[0.5s]">
          {todayEvent.description}
        </span>
        <span className="text-sm text-[#9ca8b6] transition-all duration-[0.5s]">
          {todayEvent.title}
        </span>
      </div>
    </div>
  );
};

export default TodaysEventsCard;
