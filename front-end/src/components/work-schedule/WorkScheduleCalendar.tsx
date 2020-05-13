import React from "react";
import { Calendar, momentLocalizer, Event, Formats } from "react-big-calendar";
import { isSameDay } from "date-fns";
import moment from "moment";
moment.locale("ko", {
  week: {
    dow: 1,
    doy: 1,
  },
});
const localizer = momentLocalizer(moment);

/**
 * @descr Events interpreted as one-day working block
 */
const initialCalendarDays: Event[] = [
  {
    title: "Praca",
    start: new Date("2020-03-20T10:00:00"),
    end: new Date("2020-03-20T20:00:00"),
  },
];

const formats: Formats = {
  dateFormat: "dd",
  timeGutterFormat: "HH:mm",
};

export type WorkingScheduleCalendarPropsT = {
  readonly calendarDays?: Event[];
  readonly deleteQuestionText?: string;
  readonly setCalendarDays: (days: Event[]) => void;
  readonly updateDay: (day: Event) => void;
  readonly onDeleteCalendarDay: (day: Event) => void;
};

const WorkScheduleCalendar: React.FC<WorkingScheduleCalendarPropsT> = ({
  calendarDays = initialCalendarDays,
  deleteQuestionText = "Czy chcesz usunąć ten blok?",
  setCalendarDays,
  updateDay,
  onDeleteCalendarDay,
}) => {
  const isSelectionOverlaping = (
    start: Date | string,
    end: Date | string
  ): boolean => {
    const eventIsBelow = calendarDays.findIndex((event: Event) =>
      event
        ? (start >= event.start! && start <= event.end!) ||
          (end >= event.start! && end <= event.end!)
        : false
    );
    return eventIsBelow > 0 ? true : false;
  };

  const workScheduleDayAlreadyExists = (start: Date | string) => {
    const formatedStart = typeof start == "string" ? new Date(start) : start;
    return calendarDays.find((event: Event) => {
      return isSameDay(event.start!, formatedStart);
    });
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        formats={formats}
        events={calendarDays}
        startAccessor="start"
        endAccessor="end"
        defaultView={"week"}
        selectable={true}
        views={{
          week: true,
          work_week: true,
        }}
        onSelecting={(range) => {
          if (
            isSelectionOverlaping(range.start, range.end) ||
            workScheduleDayAlreadyExists(range.start)
          ) {
            return false;
          }
          return true;
        }}
        onSelectSlot={(slot) => {
          if (
            isSelectionOverlaping(slot.start, slot.end) ||
            workScheduleDayAlreadyExists(slot.start)
          ) {
            return;
          }

          const newEvent: Event = {
            start: new Date(slot.start),
            end: new Date(slot.end),
          };

          setCalendarDays([...calendarDays, newEvent]);
          updateDay(newEvent);
        }}
        onSelectEvent={(event) => {
          const r = window.confirm(deleteQuestionText);
          if (r) {
            onDeleteCalendarDay(event);
            setCalendarDays(calendarDays.filter((e) => e !== event));
          }
        }}
      />
    </>
  );
};

export default WorkScheduleCalendar;
