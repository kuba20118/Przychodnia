import { all, call, put, takeEvery, fork, delay } from "redux-saga/effects";
import {
  ISelectedWorkerVacations,
  SelectedWorkerActionTypes,
  SelectedWorkerIdT,
  LeftVacationsDaysT,
  ISelectedWorkerVacationCreateNew,
  ISelectedWorkerWorkScheduleCreateNew,
  SelectedWorkerUpdateT,
  ISelectedWorkerWorkSchedule,
  ISelectedWorkerScheduleDay,
  ISelectedWorkerScheduleUpdateDayT,
  ISelectedWorkerVacationRequest,
} from "./types";
import {
  getSelectedWorkerVacationsAsync,
  getSelectedWorkerWorkScheduleAsync,
  createSelectedWorkerVacationsAsync,
  getSelectedWorkerVacationsLeftDaysAsync,
  updateSelectedWorkerAsync,
  createSelectedWorkerWorkScheduleAsync,
  updateSelectedWorkerScheduleDayAsync,
  getSelectedWorkerVacationRequestsAsync,
} from "./actions";
import { IReducerAction } from "..";
import apiCaller from "../../utils/apiHelper";
import { activateAlert } from "../alert/actions";

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
  action: IReducerAction<ISelectedWorkerVacationCreateNew>
) {
  try {
    yield delay(2000);
    const res: ISelectedWorkerVacations[] | any = yield call(
      apiCaller,
      "POST",
      `/users/vacations/${action.payload.userId}/new`,
      {
        fromDate: action.payload.fromDate,
        toDate: action.payload.toDate,
        idAbsence: action.payload.absenceId,
        substitutionId: action.payload.substitutionId,
      }
    );

    yield put(createSelectedWorkerVacationsAsync.success(res));

    yield put(
      activateAlert({
        body: `Sukces! Urlop został pomyślnie dodany!`,
        variant: "success",
        showTime: 6000,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Dodanie urlopu nie powiodło sie.`,
          variant: "danger",
          showTime: 6000,
        })
      );
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

function* handleGetSelectedWorkerVacationRequests(
  action: IReducerAction<SelectedWorkerIdT>
) {
  try {
    const res: ISelectedWorkerVacationRequest[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/${action.payload}/requests`
    );

    yield put(getSelectedWorkerVacationRequestsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getSelectedWorkerVacationRequestsAsync.failure(err.message!));
    } else {
      yield put(
        getSelectedWorkerVacationRequestsAsync.failure(
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
      `/schedules/${action.payload}`
    );

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

function* handleCreateSelectedWorkerWorkSchedule(
  action: IReducerAction<ISelectedWorkerWorkScheduleCreateNew>
) {
  try {
    yield delay(2000);
    const res: ISelectedWorkerWorkSchedule[] | any = yield call(
      apiCaller,
      "POST",
      `/schedules/generate/${action.payload.idUser}`,
      {
        day: action.payload.day,
        numberOfWeeks: action.payload.numOfWeeks,
      }
    );

    yield put(createSelectedWorkerWorkScheduleAsync.success(res));

    yield put(
      activateAlert({
        body: `Sukces! Nowy grafik został pomyślnie wygenerowany!`,
        variant: "success",
        showTime: 6000,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Wygenerowanie grafiku nie powiodło sie.`,
          variant: "danger",
          showTime: 6000,
        })
      );
      yield put(createSelectedWorkerWorkScheduleAsync.failure(err.message!));
    } else {
      yield put(
        createSelectedWorkerWorkScheduleAsync.failure(
          "An unknown error occured."
        )
      );
    }
  }
}

function* handleUpdateSelectedWorkerScheduleDay(
  action: IReducerAction<ISelectedWorkerScheduleUpdateDayT>
) {
  try {
    const res: ISelectedWorkerScheduleDay[] | any = yield call(
      apiCaller,
      "PUT",
      `/schedules/edit/${action.payload.userId}`,
      {
        fromTime: action.payload.fromTime,
        toTime: action.payload.toTime,
        type: action.payload.type,
      }
    );

    yield put(updateSelectedWorkerScheduleDayAsync.success(res));
    yield put(
      activateAlert({
        body: `Sukces! Dzień został pomyślnie zaktualizowny!`,
        variant: "success",
        showTime: 1500,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Aktualizacja dnia nie powiodła się.`,
          variant: "danger",
          showTime: 1500,
        })
      );
      yield put(updateSelectedWorkerScheduleDayAsync.failure(err.message!));
    } else {
      yield put(
        updateSelectedWorkerScheduleDayAsync.failure(
          "An unknown error occured."
        )
      );
    }
  }
}

function* handleUpdateSelectedWorker(
  action: IReducerAction<SelectedWorkerUpdateT>
) {
  try {
    delay(2000);
    const res: ISelectedWorkerVacations[] | any = yield call(
      apiCaller,
      "PUT",
      `/users/update/${action.payload.userId}`,
      {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        idRole: action.payload.idRole,
        fireDate: action.payload.fireDate,
        currentlyEmployed: action.payload.currentlyEmployed,
        workingHours: action.payload.workingHours,
      }
    );

    yield put(updateSelectedWorkerAsync.success(res));
    yield put(
      activateAlert({
        body: `Sukces! Użytkownik został pomyślnie zaktualizowny!`,
        variant: "success",
        showTime: 6000,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Aktualizacja użytkownika nie powiodła się.`,
          variant: "danger",
          showTime: 6000,
        })
      );
      yield put(updateSelectedWorkerAsync.failure(err.message!));
    } else {
      yield put(updateSelectedWorkerAsync.failure("An unknown error occured."));
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

function* watchGetSelectedWorkerVacationRequestsRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.GET_SELECTED_WORKER_VACATION_REQUESTS,
    handleGetSelectedWorkerVacationRequests
  );
}

function* watchGetSelectedWorkerWorkScheduleRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.GET_SELECTED_WORKER_WORK_SCHEDULE,
    handleGetSelectedWorkerWorkSchedule
  );
}

function* watchCreateSelectedWorkerWorkScheduleRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.CREATE_SELECTED_WORKER_WORK_SCHEDULE,
    handleCreateSelectedWorkerWorkSchedule
  );
}

function* watchUpdateSelectedWorkerScheduleDayRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER_SCHEDULE_DAY,
    handleUpdateSelectedWorkerScheduleDay
  );
}

function* watchUpdateSelectedWorkerRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.UPDATE_SELECTED_WORKER,
    handleUpdateSelectedWorker
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
    fork(watchGetSelectedWorkerVacationRequestsRequest),
    fork(watchGetSelectedWorkerWorkScheduleRequest),
    fork(watchCreateSelectedWorkerWorkScheduleRequest),
    fork(watchUpdateSelectedWorkerScheduleDayRequest),
    fork(watchUpdateSelectedWorkerRequest),
  ]);
}
