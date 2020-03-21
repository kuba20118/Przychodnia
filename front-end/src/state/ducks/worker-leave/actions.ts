import { createAsyncAction } from "typesafe-actions";
import { WorkerLeaveActionTypes, WorkerLeaveDataT } from "./types";

export const createWorkerLeaveAsync = createAsyncAction(
  WorkerLeaveActionTypes.CREATE_WORKER_LEAVE,
  WorkerLeaveActionTypes.CREATE_WORKER_LEAVE_SUCCESS,
  WorkerLeaveActionTypes.CREATE_WORKER_LEAVE_ERROR
)<WorkerLeaveDataT, undefined, string>();
