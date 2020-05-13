import { WorkScheduleDayT, WorkScheduleGenerateDayT } from "./types";
import { Event } from "react-big-calendar";
import { differenceInHours } from "date-fns";

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
): WorkScheduleGenerateDayT[] => {
  const days = events.map(transformCalendarEventToDay).sort(sortDaysAscending);

  const fullWeekLength = 7;
  if (days.length < 5 || days.length === fullWeekLength) return days;

  const daysToAdd = Math.abs(days.length - fullWeekLength);
  let tempLastDay = days[days.length - 1];

  for (let i = 0; i < daysToAdd; i++) {
    const nextDay = new Date(tempLastDay.fromTime).getUTCDate() + 1;
    const newDate = new Date();
    newDate.setUTCDate(nextDay);
    newDate.setUTCHours(0, 0, 0);

    const nullDay = {
      fromTime: newDate.toISOString(),
      toTime: newDate.toISOString(),
      type: "Praca",
    };
    tempLastDay = nullDay;

    days.push(nullDay);
  }
  return days;
};

export const transformCalendarEventToDay = (event: Event) => {
  return {
    fromTime: event.start!.toISOString(),
    toTime: event.end!.toISOString(),
    type: event.title,
  };
};
