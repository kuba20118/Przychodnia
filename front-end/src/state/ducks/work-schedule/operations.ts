import { WorkScheduleDayT, WorkScheduleGenerateDayT } from "./types";
import { Event } from "react-big-calendar";
import {
  differenceInHours,
  isSameDay,
  isSameWeek,
  isSameMonth,
  startOfWeek,
  getDay,
  addDays,
  subDays,
  getDayOfYear,
  setDayOfYear,
} from "date-fns";
import formatToString from "../../utils/date/formatToString";

const fullWeekLength = 7;

const isAllDay = (from: Date, to: Date): boolean =>
  differenceInHours(to, from) === 23;

const isEmptyDay = (from: Date, to: Date): boolean =>
  differenceInHours(to, from) === 0;

const sortDaysAscending = (
  a: WorkScheduleGenerateDayT,
  b: WorkScheduleGenerateDayT
) => new Date(a.toTime!).getTime() - new Date(b.toTime!).getTime();

export const tranformDaysToCalendarEvents = (
  days: WorkScheduleDayT[]
): Event[] =>
  days
    .map((day) => {
      const allDay = isAllDay(new Date(day.fromTime), new Date(day.toTime));
      return {
        start: new Date(day.fromTime),
        end: new Date(day.toTime),
        allDay: allDay,
        title: `${day.type} ${allDay ? " - cały dzień" : ""}`,
      };
    })
    .filter((day) => !isEmptyDay(new Date(day.start), new Date(day.end)));

export const tranformCalendarEventsToDays = (
  events: Event[]
): WorkScheduleGenerateDayT[] =>
  events.map((event) => transformCalendarEventToDay(event, "Praca"));

export const transformCalendarEventToDay = (event: Event, type?: string) => {
  return {
    fromTime: formatToString(event.start!),
    toTime: formatToString(event.end!),
    type: type,
  };
};

const createGenerateDayNull = (date: Date): WorkScheduleGenerateDayT => {
  return {
    fromTime: formatToString(date),
    toTime: formatToString(date),
    type: undefined,
  };
};

const getNextDay = (date: Date, num: number) => {
  const nextDay = date.getDate() + num;
  const newDate = new Date();
  newDate.setDate(nextDay);
  newDate.setHours(0, 0, 0);

  return newDate;
};

export const prepareDaysToGenerate = (
  days: WorkScheduleGenerateDayT[],
  currWeekFirstDayDate: Date
) => {
  const currWeekDays = getCurrWeekDays(days, currWeekFirstDayDate);
  const leftDays: WorkScheduleGenerateDayT[] = [];

  const fullWeekDaysNums = [1, 2, 3, 4, 5, 6, 0];
  fullWeekDaysNums.forEach((dayNum, i) => {
    const currWeekDay = currWeekDays.find((day) => {
      return dayNum === getDay(new Date(day.fromTime!));
    });
    if (!currWeekDay) {
      const date = addDays(currWeekFirstDayDate, i);
      leftDays.push(createGenerateDayNull(date));
    }
  });

  return currWeekDays.concat(leftDays).sort(sortDaysAscending);
};

export const canCalendarDayBeUpdated = (
  calendarDay: Event,
  deletedCalendarDays?: Event[]
) => {
  return deletedCalendarDays!.find((deletedDay) =>
    isSameDay(deletedDay.start!, calendarDay.start!)
  );
};

export const getCurrWeekDays = (
  days: WorkScheduleGenerateDayT[],
  currWeekFirstDayDate: Date
): WorkScheduleGenerateDayT[] => {
  return days.filter((day) => {
    return (
      isSameWeek(new Date(day.fromTime!), currWeekFirstDayDate, {
        weekStartsOn: 1,
      }) && isSameMonth(new Date(day.fromTime!), currWeekFirstDayDate)
    );
  });
};

export const workEventStyle = {
  backgroundColor: "#007bff",
  borderColor: "#007bff",
};

export const vacationEventStyle = {
  backgroundColor: "#03c100",
  borderColor: "#03c100",
};

export const subEventStyle = {
  backgroundColor: "#ffd400",
  borderColor: "#ffd400",
  color: "#000",
};
