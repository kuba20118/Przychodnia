import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  ISelectedWorkerVacations,
  SelectedWorkerActionTypes,
  SelectedWorkerIdT
} from "./types";
import {
  getSelectedWorkerVacationsAsync,
  getSelectedWorkerWorkScheduleAsync
} from "./actions";
import { IReducerAction } from "..";
import apiCaller from "../../utils/apiHelper";

function* handleGetSelectedWorkerVacations(
  action: IReducerAction<SelectedWorkerIdT>
) {
  try {
    const res: ISelectedWorkerVacations[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/${action.payload}`
    );

    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    yield put(getSelectedWorkerVacationsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getSelectedWorkerVacationsAsync.failure(err.message!));
    } else {
      yield put(
        getSelectedWorkerVacationsAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleGetSelectedWorkerWorkSchedule(
  action: IReducerAction<SelectedWorkerIdT>
) {
  try {
    const res: ISelectedWorkerVacations[] | any = yield call(
      apiCaller,
      "GET",
      `/users/workschedule/${action.payload}`
    );

    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    yield put(getSelectedWorkerWorkScheduleAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getSelectedWorkerWorkScheduleAsync.failure(err.message!));
    } else {
      yield put(
        getSelectedWorkerWorkScheduleAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* watchGetSelectedWorkerVacationsRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS,
    handleGetSelectedWorkerVacations
  );
}

function* watchGetSelectedWorkerWorkScheduleRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE,
    handleGetSelectedWorkerWorkSchedule
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* selectedWorkerSaga() {
  yield all([
    fork(watchGetSelectedWorkerVacationsRequest),
    fork(watchGetSelectedWorkerWorkScheduleRequest)
  ]);
}
