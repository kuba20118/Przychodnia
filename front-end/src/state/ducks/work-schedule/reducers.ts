import {
  WorkScheduleActionTypes,
  WorkScheduleStateT,
  WorkScheduleDataT,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialWorkScheduleState: WorkScheduleStateT = {
  userWorkSchedule: undefined,
  isLoadingUserWorkSchedule: false,
  loaded: false,
};

export const workScheduleReducer = (
  state: WorkScheduleStateT = initialWorkScheduleState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, WorkScheduleDataT & boolean>
): WorkScheduleStateT => {
  switch (action.type) {
    case WorkScheduleActionTypes.CREATE_WORK_SCHEDULE: {
      return { ...state };
    }
    case WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_SUCCESS: {
      return { ...state, current: action.payload, loaded: true };
    }
    case WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_ERROR: {
      return { ...state };
    }
    case WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE: {
      return { ...state };
    }
    case WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_SUCCESS: {
      return { ...state, current: action.payload, loaded: true };
    }
    case WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_ERROR: {
      return { ...state };
    }
    case WorkScheduleActionTypes.FETCH_WORK_SCHEDULE: {
      return { ...state };
    }
    case WorkScheduleActionTypes.FETCH_WORK_SCHEDULE_SUCCESS: {
      return { ...state, current: action.payload, loaded: true };
    }
    case WorkScheduleActionTypes.FETCH_WORK_SCHEDULE_ERROR: {
      return { ...state };
    }
    case WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE: {
      return { ...state, isLoadingUserWorkSchedule: true };
    }
    case WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE_SUCCESS: {
      return {
        ...state,
        userWorkSchedule: action.payload,
        isLoadingUserWorkSchedule: true,
      };
    }
    case WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE_ERROR: {
      return { ...state, isLoadingUserWorkSchedule: false };
    }
    default:
      return state;
  }
};
