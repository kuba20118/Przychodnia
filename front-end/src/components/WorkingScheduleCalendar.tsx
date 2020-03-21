import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { addDays } from "date-fns/esm";
import { subDays } from "date-fns";
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
};

const WorkingScheduleCalendar: React.FC<WorkingScheduleCalendarPropsT> = ({
  events = myEvents
}) => {
  const [eventsState, setEventsState] = useState<Event[]>(events);

  const handleRecurringEvents = (nextWeek: Date) => {
    let recurringEvents: Event[] = [];
    if (eventsState.length > 0) {
      if (nextWeek.getTime() > eventsState[0].start!.getTime()) {
        recurringEvents = eventsState.map((event: Event) => {
          return {
            ...event,
            start: addDays(event.start!, 7),
            end: addDays(event.end!, 7)
          };
        });
        setEventsState(recurringEvents);
      } else if (nextWeek.getTime() < eventsState[0].start!.getTime()) {
        recurringEvents = eventsState.map((event: Event) => {
          return {
            ...event,
            start: subDays(event.start!, 7),
            end: subDays(event.end!, 7)
          };
        });
        setEventsState(recurringEvents);
      }
    }
  };

  const isSelectionOverlaping = (start: Date | string, end: Date | string) => {
    return eventsState.find((event: Event) => {
      if (event) {
        return (
          (start >= event.start! && start <= event.end!) ||
          (end >= event.start! && end <= event.end!)
        );
      }
    });
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
          month: false,
          week: true,
          work_week: true
        }}
        drilldownView="week"
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
          const r = window.confirm("Czy chcesz usunąć ten blok?");

          if (r) {
            setEventsState(eventsState.filter((e) => e !== event));
          }
        }}
        onNavigate={(nextWeekDate) => handleRecurringEvents(nextWeekDate)}
      />
    </>
  );
};

export default WorkingScheduleCalendar;
