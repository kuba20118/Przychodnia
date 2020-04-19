import { all, put, takeEvery, fork } from "redux-saga/effects";
import { WorkScheduleDataT, WorkScheduleActionTypes } from "./types";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { createWorkScheduleAsync, updateWorkScheduleAsync } from "./actions";

function* handleCreateWorkSchedule(action: IReducerAction<WorkScheduleDataT>) {
  try {
    // const res: any = yield fakeCreateWorkSchedule(action.payload);

    createWorkScheduleAsync.success(action.payload);

    // history.push("/login", { message: "Wylogowano pomyślnie." });
  } catch (err) {
    if (err instanceof Error) {
      yield put(createWorkScheduleAsync.failure(err.stack!));
    } else {
      yield put(createWorkScheduleAsync.failure("An unknown error occured."));
    }
  }
}

function* watchCreateWorkScheduleRequest(): Generator {
  yield takeEvery(
    WorkScheduleActionTypes.CREATE_WORK_SCHEDULE,
    handleCreateWorkSchedule
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* workScheduleSaga() {
  yield all([fork(watchCreateWorkScheduleRequest)]);
}
