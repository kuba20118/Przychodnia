import { UserT, UserIdT } from "../user/types";
import { VacationsDataT } from "../vacations/types";
import { WorkScheduleDataT } from "../work-schedule/types";

export type SelectedWorkerIdT = UserIdT;
export interface ISelectedWorker extends UserT {}
export interface ISelectedWorkerVacations extends VacationsDataT {}
export interface ISelectedWorkerWorkSchedule extends WorkScheduleDataT {}

export type SelectedWorkerStateT = {
  worker?: ISelectedWorker;
  vacations?: ISelectedWorkerVacations[];
  workSchedule?: ISelectedWorkerWorkSchedule[];
  error?: string;
};

export enum SelectedWorkerActionTypes {
  SET_SELECTED_WORKER = "@@selected-worker/SET_SELECTED_WORKER",
  GET_SELECTED_WORKER_VACATIONS = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS",
  GET_SELECTED_WORKER_VACATIONS_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_SUCCESS",
  GET_SELECTED_WORKER_VACATIONS_ERROR = "@@selected-worker/GET_SELECTED_WORKER_VACATIONS_ERROR",
  GET_SELECTED_WORKER_WORK_SCHEDULE = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE",
  GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS",
  GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR = "@@selected-worker/GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR"
}
