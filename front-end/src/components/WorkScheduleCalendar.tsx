import React from "react";
import { Calendar, momentLocalizer, Event, Formats } from "react-big-calendar";
import moment from "moment";
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
};

const WorkScheduleCalendar: React.FC<WorkingScheduleCalendarPropsT> = ({
  calendarDays = initialCalendarDays,
  deleteQuestionText = "Czy chcesz usunąć ten blok?",
  setCalendarDays,
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
          if (isSelectionOverlaping(range.start, range.end)) {
            return false;
          }
          return true;
        }}
        onSelectSlot={(slot) => {
          if (isSelectionOverlaping(slot.start, slot.end)) {
            return;
          }

          const newEvent: Event = {
            start: new Date(slot.start),
            end: new Date(slot.end),
          };

          setCalendarDays([...calendarDays, newEvent]);
        }}
        onSelectEvent={(event) => {
          const r = window.confirm(deleteQuestionText);

          if (r) {
            setCalendarDays(calendarDays.filter((e) => e !== event));
          }
        }}
      />
    </>
  );
};

export default WorkScheduleCalendar;
