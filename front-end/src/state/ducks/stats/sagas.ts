import { all, put, takeEvery, fork, call } from "redux-saga/effects";
import { ChartDataT, StatsActionsTypes } from "./types";
import { getStatsAsync } from "./actions";
import apiCaller from "../../utils/apiHelper";

function* handleGetStatsRequest() {
  try {
    const res: ChartDataT | any = yield call(apiCaller, "GET", `/stats`);

    yield put(getStatsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getStatsAsync.failure(err.message!));
    } else {
      yield put(getStatsAsync.failure("An unknown error occured."));
    }
  }
}

function* watchHandleGetStatsRequest(): Generator {
  yield takeEvery(StatsActionsTypes.GET_STATS, handleGetStatsRequest);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* statsSaga() {
  yield all([fork(watchHandleGetStatsRequest)]);
}
