import dayjs from "dayjs";
import React from "react";
import Day from "./Day";

interface props {
  month: dayjs.Dayjs[][];
}

const Month: React.FC<props> = ({ month }) => {
  return (
    <div className="grid grid-cols-7 h-[600px] gap-2 rounded">
      {month.map((monthRow, monthIndex) => (
        <React.Fragment key={monthIndex}>
          {monthRow.map((day, dayIndex) => (
            <Day key={dayIndex} day={day} rowIndex={monthIndex} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
