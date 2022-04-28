import dayjs from "dayjs";
import { title } from "process";
import React, { useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdModeEditOutline,
  MdOutlineClose,
} from "react-icons/md";
import { useGlobalContext } from "../../../store/context";
import { Event } from "../../../types";
import ModalHeader from "../../headers/ModalHeader";

const ViewEventsModal: React.FC = () => {
  const {
    setViewEventsModal,
    selectedDay,
    savedEvents,
    dispatchCalEvent,
    setSelectedEvent,
  } = useGlobalContext();
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);
  const [editModel, setEditModel] = useState<boolean>(false);

  // filter all the events depending on the selected day
  useEffect(() => {
    const events = savedEvents.filter(
      (event: Event) =>
        dayjs(event.day).format("DD-MM-YY") === selectedDay.format("DD-MM-YY")
    );

    setSelectedDayEvents(events);
  }, [selectedDay, savedEvents]);

  //

  //   console.log("day events in the modal after passing", dayEvents);
  //   console.log("the selected day", selectedDay);
  //   console.log("all events", savedEvents);
  //   console.log("selected day events", selectedDayEvents);

  return (
    <div className="text-gray-900">
      {/* header */}
      <ModalHeader close={() => setViewEventsModal(false)} title="Events" />

      {/* the body */}
      {selectedDayEvents.map((dayEvent, dayEventIndex) => (
        <div key={dayEventIndex} className="px-4 py-4">
          {/* title */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div
                className={` ring-1 p-2 w-6 h-6  flex justify-center items-center rounded-full ring-${dayEvent.label}-500`}
              >
                {dayEventIndex + 1}
              </div>

              {editModel ? (
                <span>Editing</span>
              ) : (
                <span className={`bg-${dayEvent.label}-500 px-2 rounded-md`}>
                  {dayEvent.title}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <MdModeEditOutline
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  setSelectedEvent(dayEvent);
                  setEditModel(!editModel);
                }}
              />

              <MdDeleteOutline
                onClick={() => {
                  dispatchCalEvent({ type: "DELETE", payload: dayEvent });
                }}
                className="text-gray-400 cursor-pointer"
              />
            </div>
          </div>

          <div
            className={`mt-2 ml-11 ring-1 ring-${dayEvent.label}-500 h-[50px] rounded py-1 px-2`}
          >
            {dayEvent.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewEventsModal;
