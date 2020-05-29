import {
  WorkScheduleCreateNewT,
  WorkScheduleDayT,
  WorkScheduleGenerateDayT,
  WorkScheduleDataT,
  WorkScheduleUpdateDayT,
} from "./../work-schedule/types";
import { UserT, UserIdT } from "../user/types";
import {
  VacationsDataT,
  VacationCreateNewT,
  VacationRequestT,
  LeftVacationsDaysT,
} from "../vacations/types";

export type SelectedWorkerIdT = UserIdT;
export interface ISelectedWorker extends UserT {}
export interface ISelectedWorkerVacations extends VacationsDataT {}
export interface ISelectedWorkerWorkSchedule extends WorkScheduleDataT {}
export interface ISelectedWorkerVacationCreateNew extends VacationCreateNewT {}
export interface ISelectedWorkerVacationRequest extends VacationRequestT {}
export interface ISelectedWorkerLeftVacationsDaysT extends LeftVacationsDaysT {}
export interface ISelectedWorkerWorkScheduleCreateNew
  extends WorkScheduleCreateNewT {}
export interface ISelectedWorkerScheduleDay extends WorkScheduleDayT {}
export interface ISelectedWorkerScheduleGenerateDay
  extends WorkScheduleGenerateDayT {}
export interface ISelectedWorkerScheduleUpdateDayT
  extends WorkScheduleUpdateDayT {}

export type SelectedWorkerUpdateT = {
  userId: UserIdT;
  idRole: number;
  firstName: UserT["firstName"];
  lastName: UserT["lastName"];
  workingHours: UserT["workingHours"];
  currentyEmployed: UserT["currentyEmployed"];
  fireDate: UserT["fireDate"];
};

export type SelectedWorkerUserStateT = {
  data?: ISelectedWorker;
  isLoadingData: boolean;
  isLoadingUpdate: boolean;
  error?: string;
};

export type SelectedWorkerVacationsStateT = {
  data?: ISelectedWorkerVacations[];
  leftDays?: ISelectedWorkerLeftVacationsDaysT[];
  requests?: ISelectedWorkerVacationRequest[];
  isLoadingData: boolean;
  isLoadingLeftDays: boolean;
  isLoadingCreateData: boolean;
  isLoadingGetRequests: boolean;
  error?: string;
};

export type SelectedWorkerWorkScheduleStateT = {
  data?: ISelectedWorkerWorkSchedule;
  isLoading: boolean;
  error?: string;
};

export type SelectedWorkerStateT = {
  user: SelectedWorkerUserStateT;
  vacation: SelectedWorkerVacationsStateT;
  workSchedule: SelectedWorkerWorkScheduleStateT;
};

export enum SelectedWorkerActionTypes {
  SET_SELECTED_WORKER = "@@selected-worker/SET_SELECTED_WORKER",

  GET_SELECTED_WORKER_VACATIONS = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS",
  GET_SELECTED_WORKER_VACATIONS_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_SUCCESS",
  GET_SELECTED_WORKER_VACATIONS_ERROR = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_ERROR",

  GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS",
  GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_SUCCESS",
  GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_ERROR = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_ERROR",

  CREATE_SELECTED_WORKER_VACATIONS = "@@selected-worker/CREATE_SELECTED_WORKER_VACATIONS",
  CREATE_SELECTED_WORKER_VACATIONS_SUCCESS = "@@selected-worker/CREATE_SELECTED_WORKER_VACATIONS_SUCCESS",
  CREATE_SELECTED_WORKER_VACATIONS_ERROR = "@@selected-worker/CREATE_SELECTED_WORKER_VACATIONS_ERROR",

  GET_SELECTED_WORKER_VACATION_REQUESTS = "@@selected-worker/GET_SELECTED_WORKER_VACATION_REQUESTS",
  GET_SELECTED_WORKER_VACATION_REQUESTS_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_VACATION_REQUESTS_SUCCESS",
  GET_SELECTED_WORKER_VACATION_REQUESTS_ERROR = "@@selected-worker/GET_SELECTED_WORKER_VACATION_REQUESTS_ERROR",

  GET_SELECTED_WORKER_WORK_SCHEDULE = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE",
  GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS",
  GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR",

  CREATE_SELECTED_WORKER_WORK_SCHEDULE = "@@selected-worker/CREATE_SELECTED_WORKER_WORK_SCHEDULE",
  CREATE_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS = "@@selected-worker/CREATE_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS",
  CREATE_SELECTED_WORKER_WORK_SCHEDULE_ERROR = "@@selected-worker/CREATE_SELECTED_WORKER_WORK_SCHEDULE_ERROR",

  UPDATE_SELECTED_WORKER_SCHEDULE_DAY = "@@selected-worker/UPDATE_SELECTED_WORKER_SCHEDULE_DAY",
  UPDATE_SELECTED_WORKER_SCHEDULE_DAY_SUCCESS = "@@selected-worker/UPDATE_SELECTED_WORKER_SCHEDULE_DAY_SUCCESS",
  UPDATE_SELECTED_WORKER_SCHEDULE_DAY_ERROR = "@@selected-worker/UPDATE_SELECTED_WORKER_SCHEDULE_DAY_ERROR",

  UPDATE_SELECTED_WORKER = "@@selected-worker/UPDATE_SELECTED_WORKER",
  UPDATE_SELECTED_WORKER_SUCCESS = "@@selected-worker/UPDATE_SELECTED_WORKER_SUCCESS",
  UPDATE_SELECTED_WORKER_ERROR = "@@selected-worker/UPDATE_SELECTED_WORKER_ERROR",
}
