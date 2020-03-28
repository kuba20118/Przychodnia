import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { VacationsActionTypes, VacationsDataT } from "./types";
import { IReducerAction } from "..";
import {
  createVacationsAsync,
  getUserVacationsAsync,
  fetchAllVacationsAsync
} from "./actions";
import { UserIdT } from "../user/types";
import apiCaller from "../../utils/apiHelper";

function* handleFetchAllVacations() {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      "/users/vacations"
    );
    console.log(res);

    if (res.errors) {
      throw new Error(res.errors);
    }

    fetchAllVacationsAsync.success(res);
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchAllVacationsAsync.failure(err.message!));
    } else {
      yield put(fetchAllVacationsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleCreateVacations(action: IReducerAction<VacationsDataT>) {
  try {
    // const res: any = yield fakeCreateVacations(action.payload);

    createVacationsAsync.success();

    // history.push("/login", { message: "Wylogowano pomyślnie." });
  } catch (err) {
    if (err instanceof Error) {
      yield put(createVacationsAsync.failure(err.stack!));
    } else {
      yield put(createVacationsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleGetUserVacations(action: IReducerAction<UserIdT>) {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/${action.payload}`
    );

    console.log(res);

    yield put(getUserVacationsAsync.success(res));

    // history.push("/login", { message: "Wylogowano pomyślnie." });
  } catch (err) {
    if (err instanceof Error) {
      yield put(getUserVacationsAsync.failure(err.message!));
    } else {
      yield put(getUserVacationsAsync.failure("An unknown error occured."));
    }
  }
}

function* watchfetchAllVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.FETCH_ALL_VACATIONS,
    handleFetchAllVacations
  );
}

function* watchCreateVacationsRequest(): Generator {
  yield takeEvery(VacationsActionTypes.CREATE_VACATIONS, handleCreateVacations);
}

function* watchGetUserVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_USER_VACATIONS,
    handleGetUserVacations
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* vacationsSaga() {
  yield all([
    fork(watchfetchAllVacationsRequest),
    fork(watchCreateVacationsRequest),
    fork(watchGetUserVacationsRequest)
  ]);
}
