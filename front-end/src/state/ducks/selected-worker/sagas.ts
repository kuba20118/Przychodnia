import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  ISelectedWorkerVacations,
  SelectedWorkerActionTypes,
  SelectedWorkerIdT,
  LeftVacationsDaysT
} from "./types";
import {
  getSelectedWorkerVacationsAsync,
  getSelectedWorkerWorkScheduleAsync,
  createSelectedWorkerVacationsAsync,
  getSelectedWorkerVacationsLeftDaysAsync
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

function* handleCreateSelectedWorkerVacations(
  action: IReducerAction<ISelectedWorkerVacations>
) {
  try {
    const res: ISelectedWorkerVacations[] | any = yield call(
      apiCaller,
      "POST",
      `/users/vacations/${action.payload.userId}/new`,
      {
        fromDate: action.payload.fromDate,
        toDate: action.payload.toDate,
        idAbsence: 1
      }
    );
    console.log(res);
    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    yield put(createSelectedWorkerVacationsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(createSelectedWorkerVacationsAsync.failure(err.message!));
    } else {
      yield put(
        createSelectedWorkerVacationsAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleGetSelectedWorkerVacationsLeftDays(
  action: IReducerAction<SelectedWorkerIdT>
) {
  try {
    const res: LeftVacationsDaysT[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/${action.payload}/left`
    );

    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    yield put(getSelectedWorkerVacationsLeftDaysAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getSelectedWorkerVacationsLeftDaysAsync.failure(err.message!));
    } else {
      yield put(
        getSelectedWorkerVacationsLeftDaysAsync.failure(
          "An unknown error occured."
        )
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

function* watchCreateSelectedWorkerVacationsRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_VACATIONS,
    handleCreateSelectedWorkerVacations
  );
}

function* watchGetSelectedWorkerVacationsLeftDaysRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATIONS_LEFT_DAYS,
    handleGetSelectedWorkerVacationsLeftDays
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
    fork(watchCreateSelectedWorkerVacationsRequest),
    fork(watchGetSelectedWorkerVacationsLeftDaysRequest),
    fork(watchGetSelectedWorkerWorkScheduleRequest)
  ]);
}
