import dayjs from "dayjs";
import React from "react";
import { BsCalendar4, BsCheck2Circle } from "react-icons/bs";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { useGlobalContext } from "../../store/context";
import { Activity } from "../../types";

interface props {
  filteredActivity: Activity;
}

const SingleActivity: React.FC<props> = ({ filteredActivity }) => {
  const { dispatchCalActivities, setSelectedActivity, setShowAddActivity } =
    useGlobalContext();

  // setting a random color of each event
  const colors: string[] = [
    "text-[#368f5d]",
    "text-[#ffc148]",
    "text-purple-500",
    "text-[#6969de]",
  ];
  const getColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex items-center gap-3 border px-2 py-3 rounded-md bg-white shadow ">
      {filteredActivity.complete ? (
        <BsCheck2Circle className="w-4 h-4  text-[#6969de] rounded-md hover:cursor-pointer" />
      ) : (
        <div
          className="w-4 h-4 ring-2 ring-[#6969de] rounded-md hover:cursor-pointer"
          onClick={() => {
            dispatchCalActivities({
              type: "COMPLETE",
              payload: filteredActivity,
            });
          }}
        ></div>
      )}

      <div className="flex justify-between flex-1">
        <div className="flex flex-col justify-start">
          <span className="text-lg capitalize text-ellipsis overflow-hidden ">
            {filteredActivity.title}
          </span>

          <div className={`flex items-center gap-2 text-sm ${getColor()} `}>
            <BsCalendar4 className="" />
            <span>{dayjs(filteredActivity.day).format("dddd, MMMM DD")}</span>
          </div>
        </div>

        {/* icons */}
        <div className="w-fit h-fit">
          <div className="flex gap-2">
            <MdModeEditOutline
              className={`text-gray-400 cursor-pointer ${
                filteredActivity.complete ? "hidden" : ""
              } `}
              onClick={() => {
                setSelectedActivity(filteredActivity);
                setShowAddActivity(true);
              }}
            />

            <MdDeleteOutline
              onClick={() => {
                dispatchCalActivities({
                  type: "DELETE",
                  payload: filteredActivity,
                });
              }}
              className="text-gray-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleActivity;
