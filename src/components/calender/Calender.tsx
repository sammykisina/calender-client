import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useGlobalContext } from "../../store/context";
import { getMonth } from "../../utils/utils";
import "./calender.css";

const Calender: React.FC = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth());

  const {
    setSmallCalenderMonthIndex,
    setSelectedDay,
    selectedDay,
    monthIndex,
  } = useGlobalContext();

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  // set the current month index incase of any change
  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  // styling the current day and the selected day
  const getCurrentDayClass = (day: dayjs.Dayjs): string => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currentDay = day.format(format);
    const slcDay = selectedDay && selectedDay.format(format);

    if (nowDay === currentDay) {
      return "bg-[#ffc148] rounded text-gray-900";
    } else if (currentDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold ";
    } else {
      return "";
    }
  };

  return (
    <div className="py-2 px-3 ">
      {/* calender header */}
      <header className=" flex justify-between items-center mt-2">
        <p className="text-gray-900 text-base font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}{" "}
        </p>

        <div className="flex gap-2 items-center">
          <BiChevronLeft
            onClick={handlePrevMonth}
            className="calender__nav-icon"
          />
          <BiChevronRight
            onClick={handleNextMonth}
            className="calender__nav-icon"
          />
        </div>
      </header>

      {/* the calender day names */}
      <div className="grid grid-cols-7 grid-rows-6 transition-all duration-[0.5s] mt-4">
        {currentMonth[0].map((day, index) => (
          <span className="text-[#ffc148] text-sm py-1 text-center" key={index}>
            {day.format("dd").charAt(0)}
          </span>
        ))}

        {/* days */}
        {currentMonth.map((monthRow, monthRowIndex) => (
          <React.Fragment key={monthRowIndex}>
            {monthRow.map((day, dayIndex) => (
              <button
                key={dayIndex}
                className={`py-1 w-full transition-all duration-[0.5s] ${getCurrentDayClass(
                  day
                )}`}
                onClick={() => {
                  setSmallCalenderMonthIndex(currentMonthIndex);

                  setSelectedDay(day);
                }}
              >
                <span
                  className={`text-sm font-semibold text-gray-900 transition-all duration-[0.5s] ${getCurrentDayClass(
                    day
                  )}`}
                >
                  {day.format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calender;
