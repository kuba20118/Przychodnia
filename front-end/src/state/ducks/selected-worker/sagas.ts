import { all, call, put, takeEvery, fork, delay } from "redux-saga/effects";
import {
  ISelectedWorkerVacations,
  SelectedWorkerActionTypes,
  SelectedWorkerIdT,
  ISelectedWorkerLeftVacationsDaysT,
  ISelectedWorkerVacationCreateNew,
  ISelectedWorkerWorkScheduleCreateNew,
  SelectedWorkerUpdateT,
  ISelectedWorkerWorkSchedule,
  ISelectedWorkerScheduleDay,
  ISelectedWorkerScheduleUpdateDayT,
  ISelectedWorkerVacationRequest,
  ISelectedWorker,
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
  removeSelectedWorkerVacationRequestsAsync,
  acceptSelectedWorkerVacationRequestsAsync,
  createAllWorkersWorkScheduleAsync,
} from "./actions";
import { IReducerAction } from "..";
import apiCaller from "../../utils/apiHelper";
import { activateAlert } from "../alert/actions";
import { VacationRequestIdT } from "../vacations/types";

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
        userForReplacentId: action.payload.substitutionId,
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
    const res: ISelectedWorkerLeftVacationsDaysT[] | any = yield call(
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
      `/vacation/request/${action.payload}`
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

function* handleRemoveSelectedWorkerVacationRequest(
  action: IReducerAction<VacationRequestIdT>
) {
  try {
    const res: ISelectedWorkerVacationRequest | any = yield call(
      apiCaller,
      "DELETE",
      `/vacation/request/delete/${action.payload}`
    );

    yield put(
      removeSelectedWorkerVacationRequestsAsync.success(action.payload)
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        removeSelectedWorkerVacationRequestsAsync.failure(err.message!)
      );
    } else {
      yield put(
        removeSelectedWorkerVacationRequestsAsync.failure(
          "An unknown error occured."
        )
      );
    }
  }
}

function* handleAcceptSelectedWorkerVacationRequest(
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
        userForReplacentId: action.payload.substitutionId,
      }
    );

    yield put(acceptSelectedWorkerVacationRequestsAsync.success(res));

    yield put(
      activateAlert({
        body: `Sukces! Urlop został pomyślnie zaakceptowany!`,
        variant: "success",
        showTime: 6000,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Akceptacja urlopu nie powiodła sie.`,
          variant: "danger",
          showTime: 6000,
        })
      );
      yield put(
        acceptSelectedWorkerVacationRequestsAsync.failure(err.message!)
      );
    } else {
      yield put(
        acceptSelectedWorkerVacationRequestsAsync.failure(
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

function* handleCreateAllWorkersWorkSchedule(
  action: IReducerAction<ISelectedWorkerWorkScheduleCreateNew>
) {
  try {
    yield delay(2000);
    const res: any = yield call(apiCaller, "POST", `/schedules/generate`, {
      day: action.payload.day,
      numberOfWeeks: action.payload.numOfWeeks,
    });

    yield put(createAllWorkersWorkScheduleAsync.success());

    yield put(
      activateAlert({
        body: `Sukces! Nowy grafik został pomyślnie wygenerowany dla wszystkich pracowników!`,
        variant: "success",
        showTime: 6000,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Wygenerowanie grafiku dla wszystkich pracowników nie powiodło sie.`,
          variant: "danger",
          showTime: 6000,
        })
      );
      yield put(createAllWorkersWorkScheduleAsync.failure(err.message!));
    } else {
      yield put(
        createAllWorkersWorkScheduleAsync.failure("An unknown error occured.")
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
    const res: ISelectedWorker | any = yield call(
      apiCaller,
      "PUT",
      `/users/update/${action.payload.userId}`,
      {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        idRole: action.payload.idRole,
        fireDate: action.payload.fireDate,
        currentyEmployed: action.payload.currentyEmployed,
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

function* watchRemoveSelectedWorkerVacationRequestRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.REMOVE_SELECTED_WORKER_VACATION_REQUEST,
    handleRemoveSelectedWorkerVacationRequest
  );
}

function* watchAcceptSelectedWorkerVacationRequestRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.ACCEPT_SELECTED_WORKER_VACATION_REQUEST,
    handleAcceptSelectedWorkerVacationRequest
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

function* watchCreateAllWorkersWorkScheduleRequest(): Generator {
  yield takeEvery(
    SelectedWorkerActionTypes.CREATE_ALL_WORKERS_WORK_SCHEDULE,
    handleCreateAllWorkersWorkSchedule
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
    fork(watchRemoveSelectedWorkerVacationRequestRequest),
    fork(watchAcceptSelectedWorkerVacationRequestRequest),
    fork(watchGetSelectedWorkerWorkScheduleRequest),
    fork(watchCreateSelectedWorkerWorkScheduleRequest),
    fork(watchCreateAllWorkersWorkScheduleRequest),
    fork(watchUpdateSelectedWorkerScheduleDayRequest),
    fork(watchUpdateSelectedWorkerRequest),
  ]);
}
