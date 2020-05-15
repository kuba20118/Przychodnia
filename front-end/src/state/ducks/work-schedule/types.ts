import { UserIdT } from "../user/types";

export type WorkScheduleDayT = {
  idDay: number;
  fromTime: string;
  toTime: string;
  type: string;
};

export type WorkScheduleDataT = {
  idUser: UserIdT;
  day: WorkScheduleDayT[];
};

export type WorkScheduleStateT = {
  current?: WorkScheduleDataT;
  loaded: boolean;
};

export type WorkScheduleGenerateDayT = {
  fromTime?: string;
  toTime?: string;
  type?: string;
};

export type WorkScheduleUpdateDayT = {
  userId: UserIdT;
  fromTime: string;
  toTime: string;
  type?: string;
};

export type WorkScheduleCreateNewT = {
  idUser: UserIdT;
  day: WorkScheduleGenerateDayT[];
  numOfWeeks: number;
};

export enum WorkScheduleActionTypes {
  FETCH_WORK_SCHEDULE = "@@work-schedule/FETCH_WORK_SCHEDULE",
  FETCH_WORK_SCHEDULE_SUCCESS = "@@work-schedule/FETCH_WORK_SCHEDULE_SUCCESS",
  FETCH_WORK_SCHEDULE_ERROR = "@@work-schedule/FETCH_WORK_SCHEDULE_ERROR",
  CREATE_WORK_SCHEDULE = "@@work-schedule/CREATE_WORK_SCHEDULE",
  CREATE_WORK_SCHEDULE_SUCCESS = "@@work-schedule/CREATE_WORK_SCHEDULE_SUCCESS",
  CREATE_WORK_SCHEDULE_ERROR = "@@work-schedule/CREATE_WORK_SCHEDULE_ERROR",
  UPDATE_WORK_SCHEDULE = "@@work-schedule/UPDATE_WORK_SCHEDULE",
  UPDATE_WORK_SCHEDULE_SUCCESS = "@@work-schedule/UPDATE_WORK_SCHEDULE_SUCCESS",
  UPDATE_WORK_SCHEDULE_ERROR = "@@work-schedule/UPDATE_WORK_SCHEDULE_ERROR",
}
