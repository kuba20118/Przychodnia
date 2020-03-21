import { all, put, takeEvery, fork } from "redux-saga/effects";
import { VacationsActionTypes, VacationsDataT } from "./types";
import { IReducerAction } from "..";
import history from "../../../routing/history";
import { createVacationsAsync } from "./actions";

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

function* watchCreateVacationsRequest(): Generator {
  yield takeEvery(VacationsActionTypes.CREATE_VACATIONS, handleCreateVacations);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* vacationsSaga() {
  yield all([fork(watchCreateVacationsRequest)]);
}
