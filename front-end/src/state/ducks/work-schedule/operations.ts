import { WorkScheduleDayT, WorkScheduleGenerateDayT } from "./types";
import { Event } from "react-big-calendar";
import { differenceInHours, isSameDay, isSameWeek } from "date-fns";

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
    fromTime: event.start!.toUTCString(),
    toTime: event.end!.toUTCString(),
    type: type,
  };
};

const createGenerateDayNull = (date: Date): WorkScheduleGenerateDayT => {
  return {
    fromTime: date.toUTCString(),
    toTime: date.toUTCString(),
    type: "Praca",
  };
};

const getNextDay = (date: Date, num: number) => {
  const nextDay = date.getUTCDate() + num;
  const newDate = new Date();
  newDate.setUTCDate(nextDay);
  newDate.setUTCHours(0, 0, 0);

  return newDate;
};

export const prepareDaysToGenerate = (days: WorkScheduleGenerateDayT[]) => {
  const lastWeekDays = getLastWeekDays(days);
  const leftDays: WorkScheduleGenerateDayT[] = [];

  for (let i = 0; i < fullWeekLength; i++) {
    if (!(i in lastWeekDays)) {
      const date = getNextDay(new Date(lastWeekDays[0].fromTime!), i + 1);
      leftDays.push(createGenerateDayNull(date));
    }
  }

  return lastWeekDays.concat(leftDays).sort(sortDaysAscending);
};

export const canCalendarDayBeUpdated = (
  calendarDay: Event,
  deletedCalendarDays?: Event[]
) => {
  return deletedCalendarDays!.find((deletedDay) =>
    isSameDay(deletedDay.start!, calendarDay.start!)
  );
};

export const getLastWeekDays = (
  days: WorkScheduleGenerateDayT[]
): WorkScheduleGenerateDayT[] => {
  const lastDay = days.sort(sortDaysAscending)[days.length - 1];

  return days.filter((day) => {
    return isSameWeek(new Date(day.fromTime!), new Date(lastDay.fromTime!));
  });
};
