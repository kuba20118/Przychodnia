import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  UserT,
  UserActionTypes,
  UserLoginT,
  LoginApiResponseT,
  UserRegisterT
} from "./types";
import {
  loginUserAsync,
  logoutUserAsync,
  fetchAllUsersAsync,
  registerUserAsync
} from "./actions";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { authenticateAsync, setAuthFalse } from "../auth/actions";
import apiCaller from "../../utils/apiHelper";

function* handleLogin(action: IReducerAction<UserLoginT>) {
  try {
    const res: LoginApiResponseT | any = yield call(
      apiCaller,
      "POST",
      "/auth/login",
      {
        mail: action.payload.email!,
        password: action.payload.password!
      }
    );

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
      if (err.message === "401") {
        yield put(
          loginUserAsync.failure("The provided email or password is wrong.")
        );
      } else {
        yield put(loginUserAsync.failure(err.message!));
      }
    } else {
      yield put(loginUserAsync.failure("An unknown error occured."));
    }
  }
}

function* handleLogout() {
  try {
    // const res: any = yield call(apiCaller, "POST", "/auth/logout");
    // console.log(res);

    // Save token in localStorage
    localStorage.removeItem("przychodnia-jwt");
    // Set is authenticated to false
    yield put(setAuthFalse());
    yield put(logoutUserAsync.success());

    // redirect to admin dashboard
    history.push("/login", { message: "Wylogowano pomyślnie." });
  } catch (err) {
    if (err instanceof Error) {
      yield put(logoutUserAsync.failure(err.stack!));
    } else {
      yield put(logoutUserAsync.failure("An unknown error occured."));
    }
  }
}

function* handleRegister(action: IReducerAction<UserRegisterT>) {
  try {
    const res: UserT | any = yield call(apiCaller, "POST", "/auth/register", {
      firstName: action.payload.firstName!,
      lastName: action.payload.lastName!,
      idRole: action.payload.role!,
      mail: action.payload.mail!,
      password: action.payload.password!
    });

    console.log(res);

    if (res.errors) {
      throw Error(res.errors);
    }

    yield put(registerUserAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(registerUserAsync.failure(err.stack!));
    } else {
      yield put(registerUserAsync.failure("An unknown error occured."));
    }
  }
}

function* handleFetchAllUsers() {
  try {
    const res: UserT[] | any = yield call(apiCaller, "GET", `/users`);

    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    yield put(fetchAllUsersAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchAllUsersAsync.failure(err.message!));
    } else {
      yield put(fetchAllUsersAsync.failure("An unknown error occured."));
    }
  }
}

function* watchLoginRequest(): Generator {
  yield takeEvery(UserActionTypes.LOGIN_USER, handleLogin);
}

function* watchLogoutRequest(): Generator {
  yield takeEvery(UserActionTypes.LOGOUT_USER, handleLogout);
}

function* watchRegisterRequest(): Generator {
  yield takeEvery(UserActionTypes.REGISTER_USER, handleRegister);
}

function* watchGetUsers(): Generator {
  yield takeEvery(UserActionTypes.FETCH_ALL_USERS, handleFetchAllUsers);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* userSaga() {
  yield all([
    fork(watchLoginRequest),
    fork(watchLogoutRequest),
    fork(watchRegisterRequest),
    fork(watchGetUsers)
  ]);
}
