import { all, fork, put, takeEvery } from "redux-saga/effects";
import { authenticateAsync } from "./actions";
import { AuthActionTypes } from "./types";

function* handleAuthenticate() {
  try {
    const token = localStorage.getItem("przychodnia-jwt");
    console.log(token);
    if (token) {
      // TODO: Check if token is valid
      // const tokenIsValid = api call

      // TODO: Set authorization header
      // setAuthorizationHeader()

      yield put(authenticateAsync.success());
    } else {
      yield put(authenticateAsync.failure("The token does not exist."));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(authenticateAsync.failure(err.stack!));
    } else {
      yield put(authenticateAsync.failure("An unknown error occured."));
    }
  }
}

function* watchAuthenticateRequest(): Generator {
  yield takeEvery(AuthActionTypes.AUTHENTICATE, handleAuthenticate);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* authenticationSaga() {
  yield all([fork(watchAuthenticateRequest)]);
}
