import dayjs from "dayjs";
import React from "react";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { useGlobalContext } from "../../store/context";

const CalenderHeader: React.FC = () => {
  const { monthIndex, setMonthIndex } = useGlobalContext();

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };
  return (
    <header className="grid grid-cols-3">
      <div className="flex items-center col-span-2">
        <button onClick={handleReset} className="border rounded py-1 px-4 mr-5">
          Today
        </button>

        <BiChevronsLeft
          onClick={handlePrevMonth}
          className="cursor-pointer text-gray-600 mx-2"
        />

        <BiChevronsRight
          onClick={handleNextMonth}
          className="cursor-pointer text-gray-600 mx-2"
        />
      </div>

      <div className="ml-4 text-sm text-gray-900 font-bold  flex  justify-center  items-center col-span-1">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </div>
    </header>
  );
};

export default CalenderHeader;
