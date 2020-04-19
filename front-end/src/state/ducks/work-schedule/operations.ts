import { WorkScheduleDayT, WorkScheduleGenerateDayT } from "./types";
import { Event } from "react-big-calendar";
import { differenceInHours } from "date-fns";

const isAllDay = (from: Date, to: Date): boolean =>
  differenceInHours(to, from) === 23;

export const tranformDaysToCalendarEvents = (
  days: WorkScheduleDayT[]
): Event[] =>
  days.map((day) => {
    const allDay = isAllDay(new Date(day.fromTime), new Date(day.toTime));

    return {
      start: new Date(day.fromTime),
      end: new Date(day.toTime),
      allDay: allDay,
      title: `${day.type} ${allDay ? " - cały dzień" : ""}`,
    };
  });

export const tranformCalendarEventsToDays = (
  events: Event[]
): WorkScheduleGenerateDayT[] =>
  events.map((event) => ({
    fromTime: event.start!,
    toTime: event.end!,
    type: "Praca",
  }));
