import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../store/context";
import { eventsIcons } from "../../constants/data/eventsIcons";
import dayjs from "dayjs";
import { Event } from "../../types";
import TodaysEventsCard from "./TodaysEventsCard";
import Calender from "../calender/Calender";

const TodayEvent = () => {
  const { savedEvents } = useGlobalContext();
  const [allTodayEvents, setAllTodayEvents] = useState<Event[]>([]);

  // get a random icon for each event
  const getRandomEventIcon = () => {
    return eventsIcons[Math.floor(Math.random() * eventsIcons.length)];
  };

  // todays events
  useEffect(() => {
    setAllTodayEvents(
      savedEvents.filter(
        (savedEvent: Event) =>
          dayjs(savedEvent.day).format("DD-MM-YY") ===
          dayjs().format("DD-MM-YY")
      )
    );
  }, [savedEvents]);

  return (
    <div>
      <Calender />
      <div className="bg-[#ffffff] mx-5 rounded-3xl  overflow-auto scrollbar-hide ">
        <header className="ring-1 ring-white sticky top-0 left-0 rounded-t-3xl py-2 px-3  text-gray-900 font-semibold  bg-white border">
          Today's Events
        </header>

        {/* todos */}
        <div className="p-4">
          {allTodayEvents.map((todayEvent, todayEventIndex) => (
            <TodaysEventsCard
              key={todayEventIndex}
              todayEvent={todayEvent}
              icon={getRandomEventIcon()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayEvent;
