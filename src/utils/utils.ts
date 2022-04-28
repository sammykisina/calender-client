import dayjs from "dayjs";

export const getMonth = (
  monthIndex: number = dayjs().month()
): dayjs.Dayjs[][] => {
  const year: number = dayjs().year();
  const firstDayOfMonth: number = dayjs(new Date(year, monthIndex, 1)).day();
  let currentMonthCount: number = 0 - firstDayOfMonth;

  const daysMatrix: dayjs.Dayjs[][] = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, monthIndex, currentMonthCount));
    });
  });

  return daysMatrix;
};
