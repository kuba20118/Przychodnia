import {
  WorkScheduleActionTypes,
  WorkScheduleStateT,
  WorkScheduleDataT,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialWorkScheduleState: WorkScheduleStateT = {
  loaded: false,
};

export const workerLeaveReducer = (
  state: WorkScheduleStateT = initialWorkScheduleState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, WorkScheduleDataT & boolean>
): WorkScheduleStateT => {
  switch (action.type) {
    case WorkScheduleActionTypes.CREATE_WORK_SCHEDULE: {
      return { ...initialWorkScheduleState };
    }
    case WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_SUCCESS: {
      return { ...state, current: action.payload, loaded: true };
    }
    case WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_ERROR: {
      return { ...initialWorkScheduleState };
    }
    case WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE: {
      return { ...initialWorkScheduleState };
    }
    case WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_SUCCESS: {
      return { ...state, current: action.payload, loaded: true };
    }
    case WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_ERROR: {
      return { ...initialWorkScheduleState };
    }
    case WorkScheduleActionTypes.FETCH_WORK_SCHEDULE: {
      return { ...initialWorkScheduleState };
    }
    case WorkScheduleActionTypes.FETCH_WORK_SCHEDULE_SUCCESS: {
      return { ...state, current: action.payload, loaded: true };
    }
    case WorkScheduleActionTypes.FETCH_WORK_SCHEDULE_ERROR: {
      return { ...initialWorkScheduleState };
    }
    default:
      return state;
  }
};
