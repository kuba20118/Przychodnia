import { all, put, takeEvery, fork } from "redux-saga/effects";
import { WorkerLeaveActionTypes, WorkerLeaveDataT } from "./types";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { createWorkerLeaveAsync } from "./actions";

function* handleCreateWorkerLeave(action: IReducerAction<WorkerLeaveDataT>) {
  try {
    // const res: any = yield fakeCreateWorkerLeave(action.payload);

    createWorkerLeaveAsync.success();

    // history.push("/login", { message: "Wylogowano pomyślnie." });
  } catch (err) {
    if (err instanceof Error) {
      yield put(createWorkerLeaveAsync.failure(err.stack!));
    } else {
      yield put(createWorkerLeaveAsync.failure("An unknown error occured."));
    }
  }
}

function* watchCreateWorkerLeaveRequest(): Generator {
  yield takeEvery(
    WorkerLeaveActionTypes.CREATE_WORKER_LEAVE,
    handleCreateWorkerLeave
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* workerLeaveSaga() {
  yield all([fork(watchCreateWorkerLeaveRequest)]);
}
