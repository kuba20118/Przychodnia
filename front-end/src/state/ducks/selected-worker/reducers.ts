import {
  SelectedWorkerStateT,
  SelectedWorkerActionTypes,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerWorkSchedule,
  ISelectedWorkerLeftVacationsDaysT,
  SelectedWorkerUpdateT,
  SelectedWorkerUserStateT,
  SelectedWorkerVacationsStateT,
  SelectedWorkerWorkScheduleStateT,
  ISelectedWorkerScheduleUpdateDayT,
  ISelectedWorkerScheduleDay,
  ISelectedWorkerVacationRequest,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";
import { combineReducers } from "redux";
import { isSameDay } from "date-fns";

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
      return { ...state, isLoadingUpdate: false, data: action.payload };
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
  requests: undefined,
  isLoadingData: false,
  isLoadingLeftDays: false,
  isLoadingCreateData: false,
  isLoadingGetRequests: false,
};

const selectedWorkerVacationsReducer = (
  state: SelectedWorkerVacationsStateT = initialSelectedWorkerVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      ISelectedWorkerVacations[] &
        ISelectedWorkerVacations &
        ISelectedWorkerLeftVacationsDaysT[] &
        ISelectedWorkerVacationRequest[] &
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
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS: {
      return { ...state, isLoadingGetRequests: true };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoadingGetRequests: false,
        requests: action.payload,
      };
    }
    case SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS_ERROR: {
      return { ...state, isLoadingGetRequests: false, error: action.payload };
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
    PayloadAction<
      TypeConstant,
      ISelectedWorkerWorkSchedule & ISelectedWorkerScheduleDay & string
    >
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
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE: {
      return { ...state, isLoading: true };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY: {
      return { ...state, isLoading: true };
    }
    case SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data!,
          day: state.data!.day.map((day) =>
            isSameDay(new Date(day.fromTime), new Date(action.payload.fromTime))
              ? action.payload
              : day
          ),
        },
      };
    }
    case SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY_ERROR: {
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
