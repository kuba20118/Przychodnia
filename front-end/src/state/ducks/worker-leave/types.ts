export type WorkerLeaveDataT = {
  userId: string;
  fromDate: Date;
  toDate: Date;
};

export type WorkerLeaveStateT = {
  loaded: boolean;
};

export enum WorkerLeaveActionTypes {
  CREATE_WORKER_LEAVE = "@@worker-leave/CREATE_WORKER_LEAVE",
  CREATE_WORKER_LEAVE_SUCCESS = "@@worker-leave/CREATE_WORKER_LEAVE_SUCCESS",
  CREATE_WORKER_LEAVE_ERROR = "@@worker-leave/CREATE_WORKER_LEAVE_ERROR"
}
