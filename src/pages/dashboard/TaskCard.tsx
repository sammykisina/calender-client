import React from "react";
import ProgressBar from "../../components/progressBar/ProgessBar";

interface props {
  img: string;
  noOfTasks: number;
  type: string;
  state: {
    size: number;
    progress: number;
    circleOneStroke: string;
    circleTwoStroke: string;
    strokeWidth: number;
  };
}

const TaskCard: React.FC<props> = ({ img, noOfTasks, type, state }) => {
  return (
    <div className="bg-white flex py-4 px-5 rounded-xl w-full items-center gap-3 border shadow-md">
      <div className="border shadow-md p-3 rounded-md w-[45px] h-[45px] flex justify-center items-center bg-white ">
        <img src={img} alt="" className="" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">
            {noOfTasks} Activities
          </span>
          <span className="text-gray-600">{type}</span>
        </div>
        <ProgressBar {...state} />
      </div>
    </div>
  );
};

export default TaskCard;
