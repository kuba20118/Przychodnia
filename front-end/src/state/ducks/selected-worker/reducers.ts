import {
  SelectedWorkerStateT,
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule,
  LeftVacationsDaysT
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialSelectedWorkerState: SelectedWorkerStateT = {
  worker: undefined,
  vacations: undefined,
  vacationsLeftDays: undefined,
  workSchedule: undefined,
  isLoadingVacations: false,
  isLoadingVacationsLeftDays: false,
  isLoadingCreateVacations: false,
  isLoadingWorkSchedule: false,
  isLoadingCreateWorkSchedule: false
};

export const selectedWorkerReducer = (
  state: SelectedWorkerStateT = initialSelectedWorkerState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      ISelectedWorker &
        ISelectedWorkerVacations[] &
        ISelectedWorkerVacations &
        ISelectedWorkerWorkSchedule[] &
        LeftVacationsDaysT[] &
        string
    >
): SelectedWorkerStateT => {
  switch (action.type) {
    case SelectedWorkerActionTypes.SET_SELECTED_WORKER: {
      return { ...state, worker: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS: {
      return { ...state, isLoadingVacations: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_SUCCESS: {
      return { ...state, isLoadingVacations: false, vacations: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_ERROR: {
      return { ...state, isLoadingVacations: false, error: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS: {
      return { ...state, isLoadingVacationsLeftDays: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_SUCCESS: {
      return {
        ...state,
        isLoadingVacationsLeftDays: false,
        vacationsLeftDays: action.payload
      };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_ERROR: {
      return { ...state, isLoadingVacationsLeftDays: false };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS: {
      return { ...state, isLoadingCreateVacations: true };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS_SUCCESS: {
      return {
        ...state,
        isLoadingCreateVacations: false,
        vacations: [...state.vacations!, action.payload]
      };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS_ERROR: {
      return {
        ...state,
        isLoadingCreateVacations: false,
        error: action.payload
      };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE: {
      return { ...state, isLoadingWorkSchedule: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS: {
      return {
        ...state,
        isLoadingWorkSchedule: false,
        workSchedule: action.payload
      };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR: {
      return { ...state, isLoadingWorkSchedule: false, error: action.payload };
    }
    default:
      return state;
  }
};
