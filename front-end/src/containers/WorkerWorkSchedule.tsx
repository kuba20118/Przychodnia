import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ISelectedWorkerWorkScheduleCreateNew,
  SelectedWorkerStateT,
  ISelectedWorkerScheduleUpdateDayT,
} from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import WorkScheduleCalendar from "../components/work-schedule/WorkScheduleCalendar";
import { FormGroup, FormControl, FormLabel, Col, Row } from "react-bootstrap";
import LoadingButton from "../components/LoadingButton";
import {
  createSelectedWorkerWorkScheduleAsync,
  updateSelectedWorkerScheduleDayAsync,
  createAllWorkersWorkScheduleAsync,
} from "../state/ducks/selected-worker/actions";
import {
  tranformDaysToCalendarEvents,
  tranformCalendarEventsToDays,
  transformCalendarEventToDay,
  canCalendarDayBeUpdated,
  prepareDaysToGenerate,
} from "../state/ducks/work-schedule/operations";
import { Event } from "react-big-calendar";
import { startOfWeek } from "date-fns";

const WorkerWorkSchedule: React.FC = () => {
  const dispatch = useDispatch();
  const [numOfWeeks, setNumOfWeeks] = useState<string>("1");
  const [calendarDays, setCalendarDays] = useState<Event[]>();
  const [currentWeekFirstDayDate, setCurrentWeekFirstDayDate] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [deletedCalendarDays, setDeletedCalendarDays] = useState<Event[]>([]);
  const { workSchedule, user }: SelectedWorkerStateT = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker
  );

  useEffect(() => {
    if (workSchedule.data) {
      setCalendarDays(tranformDaysToCalendarEvents(workSchedule.data.day));
    }
  }, [workSchedule.data]);

  const handleGenerateWorkSchedule = ({ ...prop }) => {
    if (user?.data && calendarDays) {
      try {
        const dataDays = prepareDaysToGenerate(
          tranformCalendarEventsToDays(calendarDays),
          currentWeekFirstDayDate
        );
        const generateWSData: ISelectedWorkerWorkScheduleCreateNew = {
          idUser: user.data?.idUser,
          day: dataDays,
          numOfWeeks: parseInt(numOfWeeks, 10),
        };
        if (prop.all) {
          dispatch(createAllWorkersWorkScheduleAsync.request(generateWSData));
        }
        dispatch(createSelectedWorkerWorkScheduleAsync.request(generateWSData));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateDay = (event: Event) => {
    if (!canCalendarDayBeUpdated(event, deletedCalendarDays)) return;

    const day: ISelectedWorkerScheduleUpdateDayT = {
      userId: user.data?.idUser!,
      ...transformCalendarEventToDay(event, "Praca"),
    };
    dispatch(updateSelectedWorkerScheduleDayAsync.request(day));
  };

  const onDeleteCalendarDay = (event: Event) => {
    setDeletedCalendarDays([...deletedCalendarDays, event]);
  };
  return (
    <div className="content">
      <WorkScheduleCalendar
        calendarDays={calendarDays}
        setCalendarDays={setCalendarDays}
        updateDay={updateDay}
        onDeleteCalendarDay={onDeleteCalendarDay}
        setCurrentWeekFirstDayDate={setCurrentWeekFirstDayDate}
      />
      <Row className="pt-3">
        <Col className="text-right">
          <p>
            *Informacja: Przy generowaniu grafiku bierze się pod uwagę ostatni
            zedytowany tydzień.
          </p>
        </Col>
      </Row>

      <Row className="py-3">
        <Col className="d-flex justify-content-end align-items-center">
          <FormGroup>
            <FormLabel>Liczba tygodni</FormLabel>

            <FormControl
              style={{ maxWidth: "150px" }}
              type="number"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setNumOfWeeks(e.currentTarget.value)
              }
              value={numOfWeeks}
              min="1"
            />
          </FormGroup>
          <div style={{ margin: "1em 0 0 1em" }}>
            <LoadingButton
              onClick={() => handleGenerateWorkSchedule({ all: true })}
              disabled={!(user?.data && calendarDays)}
              defaultText="Generuj dla wszystkich"
              defaultType="button"
              variant="warning"
              isLoading={workSchedule.isLoading}
            />
          </div>
          <div style={{ margin: "1em 0 0 1em" }}>
            <LoadingButton
              onClick={() => handleGenerateWorkSchedule({ all: false })}
              disabled={!(user?.data && calendarDays)}
              defaultText="Generuj"
              defaultType="button"
              variant="primary"
              isLoading={workSchedule.isLoading}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WorkerWorkSchedule;
