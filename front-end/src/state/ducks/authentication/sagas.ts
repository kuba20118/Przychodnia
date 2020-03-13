import { all } from "redux-saga/effects";

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* authenticationSaga() {
  yield all([]);
}
