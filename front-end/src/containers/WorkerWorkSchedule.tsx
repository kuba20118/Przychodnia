import React from "react";
import { useSelector } from "react-redux";
import { ISelectedWorkerWorkSchedule } from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import WorkScheduleCalendar from "../components/WorkScheduleCalendar";
import { Event } from "react-big-calendar";

const WorkerWorkSchedule: React.FC = () => {
  const workSchedule: ISelectedWorkerWorkSchedule[] | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker.workSchedule
  );

  const days: Event[] | undefined =
    workSchedule &&
    workSchedule.flatMap((schedule) =>
      schedule.days.map((day) => {
        return { start: new Date(day.fromTime), end: new Date(day.toTime) };
      })
    );

  return (
    <div className="content">
      <WorkScheduleCalendar events={days} />
    </div>
  );
};

export default WorkerWorkSchedule;
