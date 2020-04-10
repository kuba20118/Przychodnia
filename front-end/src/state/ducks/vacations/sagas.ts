import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
} from "./types";
import { fetchAllVacationsAsync, getVacationsCategoriesAsync } from "./actions";
import apiCaller from "../../utils/apiHelper";

function* handleFetchAllCurrentVacations() {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      "/users/vacations"
    );

    yield put(fetchAllVacationsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchAllVacationsAsync.failure(err.message!));
    } else {
      yield put(fetchAllVacationsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleGetVacationsCategories() {
  try {
    const res: VacationsCategoryT[] | any = yield call(
      apiCaller,
      "GET",
      "/dictionarydata/absences"
    );

    if (res.errors) {
      throw new Error(res.errors);
    }

    const categories: VacationsCategoryT[] = res.map(
      (res: VacationsCategoryT) => ({
        idAbsence: res.idAbsence,
        name: res.name,
        limit: res.limit,
      })
    );

    yield put(getVacationsCategoriesAsync.success(categories));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getVacationsCategoriesAsync.failure(err.message!));
    } else {
      yield put(
        getVacationsCategoriesAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* watchfetchAllCurrentVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
    handleFetchAllCurrentVacations
  );
}

function* watchGetVacationsCategories(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_VACATIONS_CATEGORIES,
    handleGetVacationsCategories
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* vacationsSaga() {
  yield all([
    fork(watchfetchAllCurrentVacationsRequest),
    fork(watchGetVacationsCategories),
  ]);
}
