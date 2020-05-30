import { all, put, takeEvery, fork } from "redux-saga/effects";
import { WorkScheduleDataT, WorkScheduleActionTypes } from "./types";
import { IReducerAction } from "..";
import { getUserWorkScheduleAsync } from "./actions";
import apiCaller from "../../utils/apiHelper";
import { UserIdT } from "../user/types";

function* handleGetUserWorkSchedule(action: IReducerAction<UserIdT>) {
  try {
    const res: WorkScheduleDataT[] | any = yield apiCaller(
      "GET",
      `/schedules/${action.payload}`
    );

    yield put(getUserWorkScheduleAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getUserWorkScheduleAsync.failure(err.stack!));
    } else {
      yield put(getUserWorkScheduleAsync.failure("An unknown error occured."));
    }
  }
}

function* watchGetUserWorkScheduleRequest(): Generator {
  yield takeEvery(
    WorkScheduleActionTypes.GET_USER_WORK_SCHEDULE,
    handleGetUserWorkSchedule
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* workScheduleSaga() {
  yield all([fork(watchGetUserWorkScheduleRequest)]);
}
