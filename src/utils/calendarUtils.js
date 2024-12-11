import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
  } from "date-fns";
  
  export const generateCalendarDays = (month, year) => {
    const startDate = startOfWeek(startOfMonth(new Date(year, month)));
    const endDate = endOfWeek(endOfMonth(new Date(year, month)));
  
    return eachDayOfInterval({ start: startDate, end: endDate });
  };
  