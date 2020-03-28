import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { VacationsActionTypes, VacationsDataT } from "./types";
import { fetchAllVacationsAsync, getVacationsTypesAsync } from "./actions";
import apiCaller from "../../utils/apiHelper";

function* handleFetchAllCurrentVacations() {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      "/users/vacations"
    );

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

function* handleGetVacationsTypes() {
  try {
    const res: string[] | any = yield call(
      apiCaller,
      "GET",
      "/users/vacations/types"
    );

    if (res.errors) {
      throw new Error(res.errors);
    }

    getVacationsTypesAsync.success(res);
  } catch (err) {
    if (err instanceof Error) {
      yield put(getVacationsTypesAsync.failure(err.message!));
    } else {
      yield put(getVacationsTypesAsync.failure("An unknown error occured."));
    }
  }
}

function* watchfetchAllCurrentVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
    handleFetchAllCurrentVacations
  );
}

function* watchGetVacationsTypes(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_VACATIONS_TYPES,
    handleGetVacationsTypes
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* vacationsSaga() {
  yield all([
    fork(watchfetchAllCurrentVacationsRequest),
    fork(watchGetVacationsTypes)
  ]);
}
