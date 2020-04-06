import { all, put, takeEvery, fork, delay } from "redux-saga/effects";
import { AlertT, AlertActionsTypes } from "./types";
import { closeAlert } from "./actions";
import { IReducerAction } from "..";

function* handleActivateAlert(action: IReducerAction<AlertT>) {
  yield delay(action.payload.showTime || 4000);
  yield put(closeAlert());
}

function* watchActivateAlert(): Generator {
  yield takeEvery(AlertActionsTypes.ACTIVATE_ALERT, handleActivateAlert);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* alertSaga() {
  yield all([fork(watchActivateAlert)]);
}
