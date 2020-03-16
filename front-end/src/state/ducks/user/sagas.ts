import { all, put, takeEvery, fork } from "redux-saga/effects";
import {
  UserT,
  UserActionTypes,
  UserCredentialsT,
  UserApiResponseT
} from "./types";
import { TokenT } from "../auth/types";
import { loginUserAsync } from "./actions";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { authenticateAsync } from "../auth/actions";

const fakeLogin = (userLogin: UserCredentialsT) => {
  return new Promise((res, rej) => {
    if (userLogin.email === "test@test.pl" && userLogin.password === "test") {
      const returnedUser: UserT = {
        id: "testid",
        email: "test@test.pl",
        password: "test",
        firstName: "Mariusz",
        lastName: "Pudzianowski"
      };

      res({ data: returnedUser, token: "test-token" });
    } else {
      rej(new Error("The provided email or password is wrong."));
    }
  });
};

function* handleLogin(action: IReducerAction<UserCredentialsT>) {
  try {
    const res: UserApiResponseT | any = yield fakeLogin(action.payload);

    // Handle Success login
    yield put(loginUserAsync.success(res));

    // Save token in localStorage
    if (res.token) {
      localStorage.setItem("przychodnia-jwt", res.token);
    } else {
      console.error("Token not provided from api.");
    }
    // Set is authenticated to true
    yield put(authenticateAsync.success());

    // redirect to admin dashboard
    history.push("/admin/panel-glowny");
  } catch (err) {
    if (err instanceof Error) {
      yield put(loginUserAsync.failure(err.stack!));
    } else {
      yield put(loginUserAsync.failure("An unknown error occured."));
    }
  }
}

function* watchLoginRequest(): Generator {
  yield takeEvery(UserActionTypes.LOGIN_USER, handleLogin);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* userSaga() {
  yield all([fork(watchLoginRequest)]);
}
