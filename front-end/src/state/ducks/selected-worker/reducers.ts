import {
  SelectedWorkerStateT,
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule,
  LeftVacationsDaysT,
  SelectedWorkerUpdateT,
  SelectedWorkerUserStateT,
  SelectedWorkerVacationsStateT,
  SelectedWorkerWorkScheduleStateT,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";
import { combineReducers } from "redux";

const initialSelectedWorkerUserState: SelectedWorkerUserStateT = {
  data: undefined,
  isLoadingData: false,
  isLoadingUpdate: false,
};

export const selectedWorkerUserReducer = (
  state: SelectedWorkerUserStateT = initialSelectedWorkerUserState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      ISelectedWorker & SelectedWorkerUpdateT & string
    >
): SelectedWorkerUserStateT => {
  // TODO: UPDATE WORKER AFTER SUCCESS UPDATE
  switch (action.type) {
    case SelectedWorkerActionTypes.SET_SELECTED_WORKER: {
      return { ...state, data: action.payload };
    }
    case SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER: {
      return { ...state, isLoadingUpdate: true };
    }
    case SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SUCCESS: {
      return { ...state, isLoadingUpdate: false };
    }
    case SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_ERROR: {
      return { ...state, isLoadingUpdate: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

const initialSelectedWorkerVacationsState: SelectedWorkerVacationsStateT = {
  data: undefined,
  leftDays: undefined,
  isLoadingData: false,
  isLoadingLeftDays: false,
  isLoadingCreateData: false,
};

const selectedWorkerVacationsReducer = (
  state: SelectedWorkerVacationsStateT = initialSelectedWorkerVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      ISelectedWorkerVacations[] &
        ISelectedWorkerVacations &
        LeftVacationsDaysT[] &
        string
    >
): SelectedWorkerVacationsStateT => {
  switch (action.type) {
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS: {
      return { ...state, isLoadingData: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_SUCCESS: {
      return { ...state, isLoadingData: false, data: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_ERROR: {
      return { ...state, isLoadingData: false, error: action.payload };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS: {
      return { ...state, isLoadingLeftDays: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_SUCCESS: {
      return {
        ...state,
        isLoadingLeftDays: false,
        leftDays: action.payload,
      };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS_ERROR: {
      return { ...state, isLoadingLeftDays: false, error: action.payload };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS: {
      return { ...state, isLoadingCreateData: true };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS_SUCCESS: {
      return {
        ...state,
        isLoadingCreateData: false,
        data: [...state.data!, action.payload],
      };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS_ERROR: {
      return {
        ...state,
        isLoadingCreateData: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const initialSelectedWorkerWorkScheduleState: SelectedWorkerWorkScheduleStateT = {
  data: undefined,
  isLoading: false,
};

const selectedWorkerWorkScheduleReducer = (
  state: SelectedWorkerWorkScheduleStateT = initialSelectedWorkerWorkScheduleState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, ISelectedWorkerWorkSchedule[] & string>
): SelectedWorkerWorkScheduleStateT => {
  switch (action.type) {
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE: {
      return { ...state, isLoading: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const selectedWorkerReducer = combineReducers<SelectedWorkerStateT>({
  user: selectedWorkerUserReducer,
  vacation: selectedWorkerVacationsReducer,
  workSchedule: selectedWorkerWorkScheduleReducer,
});
