import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

/**
 * @descr Events interpreted as one-day working block
 */
const myEvents: Event[] = [
  {
    title: "Praca",
    start: new Date("2020-03-20T10:00:00"),
    end: new Date("2020-03-20T20:00:00")
  }
];

export type WorkingScheduleCalendarPropsT = {
  events?: Event[];
  deleteQuestionText?: string;
};

const WorkScheduleCalendar: React.FC<WorkingScheduleCalendarPropsT> = ({
  events = myEvents,
  deleteQuestionText = "Czy chcesz usunąć ten blok?"
}) => {
  const [eventsState, setEventsState] = useState<Event[]>(events);

  const isSelectionOverlaping = (
    start: Date | string,
    end: Date | string
  ): boolean => {
    const eventIsBelow = eventsState.findIndex((event: Event) =>
      event
        ? (start >= event.start! && start <= event.end!) ||
          (end >= event.start! && end <= event.end!)
        : false
    );

    return eventIsBelow ? true : false;
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={eventsState}
        startAccessor="start"
        endAccessor="end"
        defaultView={"week"}
        selectable={true}
        views={{
          week: true,
          work_week: true
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
            end: new Date(slot.end)
          };

          setEventsState([...eventsState, newEvent]);
        }}
        onSelectEvent={(event) => {
          const r = window.confirm(deleteQuestionText);

          if (r) {
            setEventsState(eventsState.filter((e) => e !== event));
          }
        }}
      />
    </>
  );
};

export default WorkScheduleCalendar;
