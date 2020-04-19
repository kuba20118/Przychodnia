import { createAsyncAction } from "typesafe-actions";
import { WorkScheduleActionTypes, WorkScheduleDataT } from "./types";

export const createWorkScheduleAsync = createAsyncAction(
  WorkScheduleActionTypes.CREATE_WORK_SCHEDULE,
  WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_SUCCESS,
  WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_ERROR
)<WorkScheduleDataT, WorkScheduleDataT, string>();

export const updateWorkScheduleAsync = createAsyncAction(
  WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE,
  WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_ERROR,
  WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_ERROR
)<WorkScheduleDataT, WorkScheduleDataT, string>();
