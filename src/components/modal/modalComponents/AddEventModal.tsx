import React, { useState } from "react";
import {
  MdOutlineBookmarkBorder,
  MdOutlineCheck,
  MdOutlineSchedule,
  MdOutlineSegment,
  MdOutlineTitle,
} from "react-icons/md";
import { useGlobalContext } from "../../../store/context";
import { Event } from "../../../types";
import ModalHeader from "../../headers/ModalHeader";

const AddEventModal: React.FC = () => {
  const { setShowAddEventModal, selectedDay, selectedEvent, dispatchCalEvent } =
    useGlobalContext();

  const labelsClasses: string[] = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
  ];

  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
    selectedEvent
      ? labelsClasses.find((label) => label === selectedEvent?.label)
      : labelsClasses[0]
  );

  const [title, setTitle] = useState<string>(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState<string>(
    selectedEvent ? selectedEvent.description : ""
  );

  // the function to create the new event
  const handleSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    // create a new event object
    const calenderEvent: Event = {
      title,
      description,
      label: selectedLabel,
      day: selectedDay.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    // dispatch an event to edit the event if on is selected instead
    if (selectedEvent) {
      dispatchCalEvent({ type: "UPDATE", payload: calenderEvent });
    } else {
      dispatchCalEvent({
        type: "CREATE",
        payload: calenderEvent,
      });
    }
    setShowAddEventModal(false);
  };

  return (
    <div>
      {/* header */}
      <ModalHeader close={() => setShowAddEventModal(false)} title="Events" />

      {/* body */}
      <div className="mt-4 mx-5">
        <div className="text-gray-900 text-lg font-semibold mb-2">
          Create Your Event
        </div>
        <form className="flex flex-col gap-3">
          {/* the Event title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 ">
              <MdOutlineTitle className="text-[#222c41]" />
              <div className="rounded flex-1 ring-1">
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="form-control data__input"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
            </div>

            {/* specific day selected */}
            <div className="flex items-center gap-2">
              <MdOutlineSchedule className="text-[#222c41]" />
              <div className="ring-1 rounded flex-1">
                <input
                  type="text"
                  className=" form-control data__input"
                  value={selectedDay.format("dddd, MMMM DD")}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* the Event description */}
          <div className="flex items-center gap-2">
            <MdOutlineSegment className="text-[#222c41]" />
            <div className="ring-1 rounded flex-1">
              <input
                type="text"
                placeholder="Enter event description"
                className="form-control data__input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>

          {/* the Events specific labels */}
          <div className="flex gap-x-2 items-center  justify-center">
            <MdOutlineBookmarkBorder className="text-[#222c41]" />

            {labelsClasses.map((labelClass, index) => (
              <span
                key={index}
                onClick={() => setSelectedLabel(labelClass)}
                className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex justify-center items-center cursor-pointer`}
              >
                {selectedLabel === labelClass && (
                  <MdOutlineCheck className="text-white text-sm" />
                )}
              </span>
            ))}
          </div>

          {/* the submit button */}
          <footer>
            <button
              type="submit"
              onClick={handleSubmit}
              className=" bg-[#ffc148] px-3 py-1 rounded hover:bg-opacity-50 transition duration-[0.5s] text-gray-900"
            >
              Create Event
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
