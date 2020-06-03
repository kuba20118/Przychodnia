import { all, put, takeEvery, fork, call } from "redux-saga/effects";
import { SubstitutionT, SubstitutionActionTypes } from "./types";
import {
  getAllSubstitutionsAsync,
  getAllPastSubstitutionsAsync,
} from "./actions";
import apiCaller from "../../utils/apiHelper";

function* handleGetAllSubs() {
  try {
    const res: SubstitutionT[] | any = yield call(
      apiCaller,
      "GET",
      `/vacation/replacements`
    );

    yield put(getAllSubstitutionsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getAllSubstitutionsAsync.failure(err.message!));
    } else {
      yield put(getAllSubstitutionsAsync.failure("An unknown error occured."));
    }
  }
}
function* watchGetAllSubs(): Generator {
  yield takeEvery(
    SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS,
    handleGetAllSubs
  );
}

function* handleGetAllPastSubs() {
  try {
    const res: SubstitutionT[] | any = yield call(
      apiCaller,
      "GET",
      `/vacation/replacements/history`
    );

    yield put(getAllPastSubstitutionsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getAllPastSubstitutionsAsync.failure(err.message!));
    } else {
      yield put(
        getAllPastSubstitutionsAsync.failure("An unknown error occured.")
      );
    }
  }
}
function* watchGetAllPastSubs(): Generator {
  yield takeEvery(
    SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS,
    handleGetAllPastSubs
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* substitutionSaga() {
  yield all([fork(watchGetAllSubs)]);
  yield all([fork(watchGetAllPastSubs)]);
}
