import {
  SelectedWorkerStateT,
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialSelectedWorkerState: SelectedWorkerStateT = {
  worker: undefined,
  vacations: undefined,
  workSchedule: undefined
};

export const selectedWorkerReducer = (
  state: SelectedWorkerStateT = initialSelectedWorkerState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      ISelectedWorker &
        ISelectedWorkerVacations[] &
        ISelectedWorkerWorkSchedule[] &
        string
    >
): SelectedWorkerStateT => {
  switch (action.type) {
    case SelectedWorkerActionTypes.SET_SELECTED_WORKER: {
      return { ...state, worker: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS: {
      return { ...state };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_SUCCESS: {
      return { ...state, vacations: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_ERROR: {
      return { ...state, error: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE: {
      return { ...state };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS: {
      return { ...state, workSchedule: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
