import { UserT, UserIdT } from "../user/types";
import { VacationsDataT, VacationCreateNewT } from "../vacations/types";
import { WorkScheduleDataT } from "../work-schedule/types";

export type SelectedWorkerIdT = UserIdT;
export interface ISelectedWorker extends UserT {}
export interface ISelectedWorkerVacations extends VacationsDataT {}
export interface ISelectedWorkerWorkSchedule extends WorkScheduleDataT {}
export interface ISelectedWorkerVacationCreateNew extends VacationCreateNewT {}

export type SelectedWorkerUpdateT = {
  idRole: number;
  firstName: UserT["firstName"];
  lastName: UserT["lastName"];
};

export type SelectedWorkerUpdateEmploymentT = {
  workingHours: UserT["workingHours"];
  currentlyEmployed: UserT["currentlyEmployed"];
  fireDate: UserT["fireDate"];
};

export type LeftVacationsDaysT = {
  userId: UserIdT;
  leftDays: number;
  vacationType: string;
};

export type SelectedWorkerUserStateT = {
  data?: ISelectedWorker;
  isLoadingData: boolean;
  isLoadingUpdate: boolean;
  isLoadingEmploymentUpdate: boolean;
  error?: string;
};

export type SelectedWorkerVacationsStateT = {
  data?: ISelectedWorkerVacations[];
  leftDays?: LeftVacationsDaysT[];
  isLoadingData: boolean;
  isLoadingLeftDays: boolean;
  isLoadingCreateData: boolean;
  error?: string;
};

export type SelectedWorkerWorkScheduleStateT = {
  data?: ISelectedWorkerWorkSchedule[];
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

  GET_SELECTED_WORKER_WORK_SCHEDULE = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE",
  GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS",
  GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR",

  UPDATE_SELECTED_WORKER = "@@selected-worker/UPDATE_SELECTED_WORKER",
  UPDATE_SELECTED_WORKER_SUCCESS = "@@selected-worker/UPDATE_SELECTED_WORKER_SUCCESS",
  UPDATE_SELECTED_WORKER_ERROR = "@@selected-worker/UPDATE_SELECTED_WORKER_ERROR",

  UPDATE_SELECTED_WORKER_EMPLOYMENT = "@@selected-worker/UPDATE_SELECTED_EMPLOYMENT_WORKER",
  UPDATE_SELECTED_WORKER_EMPLOYMENT_SUCCESS = "@@selected-worker/UPDATE_SELECTED_EMPLOYMENT_SUCCESS",
  UPDATE_SELECTED_WORKER_EMPLOYMENT_ERROR = "@@selected-worker/UPDATE_SELECTED_EMPLOYMENT_ERROR",
}
