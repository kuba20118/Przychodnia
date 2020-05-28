import { createAsyncAction, action } from "typesafe-actions";
import {
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule,
  SelectedWorkerIdT,
  LeftVacationsDaysT,
  ISelectedWorkerVacationCreateNew,
  ISelectedWorkerWorkScheduleCreateNew,
  SelectedWorkerUpdateT,
  ISelectedWorkerScheduleDay,
  ISelectedWorkerScheduleGenerateDay,
  ISelectedWorkerScheduleUpdateDayT,
  ISelectedWorkerVacationRequest,
} from "./types";

export const setSelectedWorker = (worker: ISelectedWorker) =>
  action(SelectedWorkerActionTypes.SET_SELECTED_WORKER, worker);

export const updateSelectedWorkerAsync = createAsyncAction(
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SUCCESS,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_ERROR
)<SelectedWorkerUpdateT, ISelectedWorker, string>();

// --------------------------------
// vacagtions

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

export const getSelectedWorkerVacationRequestsAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS_ERROR
)<SelectedWorkerIdT, ISelectedWorkerVacationRequest[], string>();

// --------------------------------
// Work schedule

export const getSelectedWorkerWorkScheduleAsync = createAsyncAction(
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS,
  SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR
)<SelectedWorkerIdT, ISelectedWorkerWorkSchedule[], string>();

export const createSelectedWorkerWorkScheduleAsync = createAsyncAction(
  SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE,
  SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS,
  SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE_ERROR
)<
  ISelectedWorkerWorkScheduleCreateNew,
  ISelectedWorkerWorkSchedule[],
  string
>();

export const updateSelectedWorkerScheduleDayAsync = createAsyncAction(
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY_SUCCESS,
  SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY_ERROR
)<ISelectedWorkerScheduleUpdateDayT, ISelectedWorkerScheduleDay, string>();
