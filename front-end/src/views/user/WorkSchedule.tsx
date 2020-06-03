import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserIdT, UserT } from "../../state/ducks/user/types";
import { getUserWorkScheduleAsync } from "../../state/ducks/work-schedule/actions";
import { IApplicationState } from "../../state/ducks";
import { WorkScheduleDataT } from "../../state/ducks/work-schedule/types";
import { Calendar, momentLocalizer, Event, Formats } from "react-big-calendar";
import {
  tranformDaysToCalendarEvents,
  workEventStyle,
  subEventStyle,
  vacationEventStyle,
} from "../../state/ducks/work-schedule/operations";
import moment from "moment";

moment.locale("pl", {
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

const WorkScheduleUserView: React.FC = () => {
  const dispatch = useDispatch();
  const [eventsDays, setEventsDays] = useState(initialCalendarDays);

  const getUserWorkSchedule = useCallback(
    (userId: UserIdT) => dispatch(getUserWorkScheduleAsync.request(userId)),
    [dispatch]
  );

  const currentUser: UserT | undefined = useSelector(
    ({ user }: IApplicationState) => user.currentUser
  );

  const userWorkSchedule: WorkScheduleDataT | undefined = useSelector(
    ({ workSchedule }: IApplicationState) => workSchedule.userWorkSchedule
  );

  useEffect(() => {
    if (currentUser) getUserWorkSchedule(currentUser.idUser);
  }, [currentUser]);

  useEffect(() => {
    if (userWorkSchedule)
      setEventsDays(tranformDaysToCalendarEvents(userWorkSchedule?.day));
  }, [userWorkSchedule]);

  return (
    <div className="content">
      <Calendar
        localizer={localizer}
        formats={formats}
        events={eventsDays}
        startAccessor="start"
        endAccessor="end"
        defaultView={"week"}
        eventPropGetter={(event, start, end, isSelected) => {
          if (event.title?.includes("Praca")) return { style: workEventStyle };
          else if (event.title?.includes("Zastepstwo"))
            return { style: subEventStyle };
          else return { style: vacationEventStyle };
        }}
        views={{
          week: true,
          work_week: true,
        }}
      />
    </div>
  );
};

export default WorkScheduleUserView;
