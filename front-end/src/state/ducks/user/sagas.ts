import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  UserT,
  UserActionTypes,
  UserCredentialsT,
  UserIdT,
  LoginApiResponseT
} from "./types";
import { TokenT } from "../auth/types";
import { loginUserAsync, logoutUserAsync, fetchAllUsersAsync } from "./actions";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { authenticateAsync, setAuthFalse } from "../auth/actions";
import apiCaller from "../../utils/apiHelper";

// const fakeLogin = (userLogin: UserCredentialsT) => {
//   return new Promise((res, rej) => {
//     if (userLogin.email === "test@test.pl" && userLogin.password === "test") {
//       const returnedUser: UserT = {
//         id: 123,
//         email: "test@test.pl",
//         password: "test",
//         firstName: "Mariusz",
//         lastName: "Pudzianowski"
//       };

//       res({ data: returnedUser, token: "test-token" });
//     } else {
//       rej(new Error("The provided email or password is wrong."));
//     }
//   });
// };

function* handleLogin(action: IReducerAction<UserCredentialsT>) {
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

function* watchLoginRequest(): Generator {
  yield takeEvery(UserActionTypes.LOGIN_USER, handleLogin);
}

function* handleLogout() {
  try {
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

function* watchLogoutRequest(): Generator {
  yield takeEvery(UserActionTypes.LOGOUT_USER, handleLogout);
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
    fork(watchGetUsers)
  ]);
}
