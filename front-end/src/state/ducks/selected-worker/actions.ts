import { createAsyncAction, action } from "typesafe-actions";
import {
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule,
  SelectedWorkerIdT
} from "./types";

export const setSelectedWorker = (worker: ISelectedWorker) =>
  action(SelectedWorkerActionTypes.SET_SELECTED_WORKER, worker);

export const getSelectedWorkerVacationsAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_ERROR
)<SelectedWorkerIdT, ISelectedWorkerVacations[], string>();

export const getSelectedWorkerWorkScheduleAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR
)<SelectedWorkerIdT, ISelectedWorkerWorkSchedule[], string>();
