import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useGlobalContext } from "../../store/context";
import { Event } from "../../types";
import Modal from "../modal/Modal";
import ViewEventsModal from "../modal/modalComponents/ViewEventsModal";

interface props {
  day: dayjs.Dayjs;
  rowIndex: number;
}

const Day: React.FC<props> = ({ day, rowIndex }) => {
  // states
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const {
    setSelectedDay,
    setShowAddEventModal,
    savedEvents,
    viewEventsModal,
    setViewEventsModal,
  } = useGlobalContext();

  // function to get specific classes if the currently rendered date is equal to todays date
  const getCurrentDayStylingClasses = (): string => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-[#ffc148] text-white rounded py-1 px-2"
      : "";
  };

  // take the events specific to each day
  useEffect(() => {
    const events = savedEvents.filter(
      (event: Event) =>
        dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div
      className="
     flex flex-col"
    >
      <div className="flex flex-col items-center h-full">
        {rowIndex === 0 && (
          <p className="text-sm mt-1 mb-3">{day.format("ddd").toUpperCase()}</p>
        )}
        <div
          className={`flex flex-col items-center border ${
            dayEvents.length ? "border-[#ffc148]" : ""
          } w-full h-full rounded-md justify-center `}
        >
          <div
            className={`text-sm my-1 flex justify-center items-center cursor-pointer rounded p-1 ${getCurrentDayStylingClasses()}`}
            onClick={() => {
              setSelectedDay(day);
              setShowAddEventModal(true);
            }}
          >
            {day.format("DD")}
          </div>

          {/* icons */}
          {dayEvents.length ? (
            <div className="flex gap-1 px-2  mx-1">
              <MdOutlineRemoveRedEye
                className="h-5 text-gray-900 cursor-pointer hover:text-[#ffc148]"
                onClick={() => {
                  setSelectedDay(day);
                  setViewEventsModal(true);
                }}
              />

              <Modal
                component={<ViewEventsModal />}
                modalState={viewEventsModal}
                close={() => setViewEventsModal(false)}
                type=""
              />

              {/* <MdOutlineEdit className="h-5 text-white cursor-pointer hover:text-[#ffc148]" /> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Day;
