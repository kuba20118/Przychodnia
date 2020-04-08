import { createAsyncAction, action } from "typesafe-actions";
import {
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule,
  SelectedWorkerIdT,
  LeftVacationsDaysT,
  ISelectedWorkerVacationCreateNew,
  SelectedWorkerUpdateT,
  SelectedWorkerUpdateEmploymentT,
} from "./types";

export const setSelectedWorker = (worker: ISelectedWorker) =>
  action(SelectedWorkerActionTypes.SET_SELECTED_WORKER, worker);

export const getSelectedWorkerVacationsAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_ERROR
)<SelectedWorkerIdT, ISelectedWorkerVacations[], string>();

export const getSelectedWorkerVacationsLeftDaysAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_ERROR
)<SelectedWorkerIdT, LeftVacationsDaysT[], string>();

export const createSelectedWorkerVacationsAsync = createAsyncAction(
  SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS,
  SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS_SUCCESS,
  SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS_ERROR
)<ISelectedWorkerVacationCreateNew, ISelectedWorkerVacations[], string>();

export const getSelectedWorkerWorkScheduleAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR
)<SelectedWorkerIdT, ISelectedWorkerWorkSchedule[], string>();

export const updateSelectedWorkerAsync = createAsyncAction(
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SUCCESS,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_ERROR
)<SelectedWorkerUpdateT, ISelectedWorker, string>();

export const updateSelectedWorkerEmploymentAsync = createAsyncAction(
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_EMPLOYMENT,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_EMPLOYMENT_SUCCESS,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_EMPLOYMENT_ERROR
)<SelectedWorkerUpdateEmploymentT, ISelectedWorker, string>();
