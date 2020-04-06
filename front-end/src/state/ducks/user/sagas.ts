import { all, call, put, takeEvery, fork, delay } from "redux-saga/effects";
import {
  UserT,
  UserActionTypes,
  UserLoginT,
  LoginApiResponseT,
  UserRegisterT,
  UserIdT,
} from "./types";
import {
  loginUserAsync,
  logoutUserAsync,
  fetchAllUsersAsync,
  registerUserAsync,
} from "./actions";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { authenticateAsync, setAuthFalse } from "../auth/actions";
import apiCaller from "../../utils/apiHelper";
import { activateAlert } from "../alert/actions";
import { AlertT } from "../alert/types";

function* handleLogin(action: IReducerAction<UserLoginT>) {
  try {
    const res: LoginApiResponseT | any = yield call(
      apiCaller,
      "POST",
      "/auth/login",
      {
        mail: action.payload.email!,
        password: action.payload.password!,
      }
    );

    if (res.errors) {
      throw new Error(res.errors);
    }

    // Save token and user in localStorage
    if (res.token && res.userToReturn) {
      localStorage.setItem("przychodnia-jwt", res.token);
      localStorage.setItem(
        "przychodnia-user",
        JSON.stringify(res.userToReturn)
      );
    } else {
      throw new Error("The response is not valid");
    }

    // Handle Success login
    yield put(loginUserAsync.success(res!.userToReturn));

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

function* handleLogout(action: IReducerAction<UserIdT>) {
  try {
    // delete token and user from localstorage
    yield localStorage.removeItem("przychodnia-jwt");
    yield localStorage.removeItem("przychodnia-user");

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
      password: action.payload.password!,
    });

    if (res.errors) {
      throw Error(res.errors);
    }

    yield delay(2000);
    yield put(registerUserAsync.success(res));

    const alert: AlertT = {
      body: `Sukces! Użytkownik ${res?.firstName} ${res.lastName} został pomyślnie zarejestrowany!`,
      variant: "success",
      showTime: 6000,
    };
    yield put(activateAlert(alert));
  } catch (err) {
    const alert: AlertT = {
      body: `Wystąpił błąd. Rejestracja nie powiodła się. Spróbuj ponownie później.`,
      variant: "danger",
      showTime: 6000,
    };
    yield put(activateAlert(alert));

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
    fork(watchGetUsers),
  ]);
}
