import { WorkerLeaveStateT, WorkerLeaveActionTypes } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialWorkerLeaveState: WorkerLeaveStateT = {
  loaded: false
};

export const workerLeaveReducer = (
  state: WorkerLeaveStateT = initialWorkerLeaveState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, boolean>
): WorkerLeaveStateT => {
  switch (action.type) {
    case WorkerLeaveActionTypes.CREATE_WORKER_LEAVE: {
      return { ...initialWorkerLeaveState };
    }
    case WorkerLeaveActionTypes.CREATE_WORKER_LEAVE_SUCCESS: {
      return { ...state, loaded: true };
    }
    case WorkerLeaveActionTypes.CREATE_WORKER_LEAVE_ERROR: {
      return { ...initialWorkerLeaveState };
    }
    default:
      return state;
  }
};
