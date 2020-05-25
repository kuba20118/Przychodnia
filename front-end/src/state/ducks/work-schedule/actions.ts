import { createAsyncAction } from "typesafe-actions";
import { WorkScheduleActionTypes, WorkScheduleDataT } from "./types";
import { UserIdT } from "../user/types";

export const createWorkScheduleAsync = createAsyncAction(
  WorkScheduleActionTypes.CREATE_WORK_SCHEDULE,
  WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_SUCCESS,
  WorkScheduleActionTypes.CREATE_WORK_SCHEDULE_ERROR
)<WorkScheduleDataT, WorkScheduleDataT, string>();

export const updateWorkScheduleAsync = createAsyncAction(
  WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE,
  WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_SUCCESS,
  WorkScheduleActionTypes.UPDATE_WORK_SCHEDULE_ERROR
)<WorkScheduleDataT, WorkScheduleDataT, string>();

export const getUserWorkScheduleAsync = createAsyncAction(
  WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE,
  WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE_SUCCESS,
  WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE_ERROR
)<UserIdT, WorkScheduleDataT, string>();
