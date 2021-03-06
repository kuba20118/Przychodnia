import { all, call, put, takeEvery, fork, delay } from "redux-saga/effects";
import {
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
  VacationRequestT,
  VacationRequestCreateT,
  LeftVacationsDaysT,
  VacationCategoryCreateT,
} from "./types";
import {
  fetchAllVacationsAsync,
  getVacationsCategoriesAsync,
  getUserVacationsAsync,
  createUserVacationRequestAsync,
  getUserVacationRequestsAsync,
  getUserLeftVacationsDaysAsync,
  fetchAllPastVacationsAsync,
  addVacationCategoryAsync,
  getAllUsersLeftVacationsDaysAsync,
  getUserPastVacationsAsync,
} from "./actions";
import apiCaller from "../../utils/apiHelper";
import { UserIdT } from "../user/types";
import { IReducerAction } from "..";
import { activateAlert } from "../alert/actions";

function* handleFetchAllCurrentVacationsRequest() {
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

function* handleFetchAllPastVacationsRequest() {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      "/vacation/history"
    );

    yield put(fetchAllPastVacationsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchAllPastVacationsAsync.failure(err.message!));
    } else {
      yield put(
        fetchAllPastVacationsAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleGetVacationsCategoriesRequest() {
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

function* handleAddVacationCategoryRequest(
  action: IReducerAction<VacationCategoryCreateT>
) {
  try {
    const res: VacationsCategoryT | any = yield call(
      apiCaller,
      "POST",
      "/dictionarydata/absences/add",
      {
        name: action.payload.name,
        limit: action.payload.limit,
      }
    );

    yield put(addVacationCategoryAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(addVacationCategoryAsync.failure(err.message!));
    } else {
      yield put(addVacationCategoryAsync.failure("An unknown error occured."));
    }
  }
}

function* handleGetUserVacationsRequest(action: IReducerAction<UserIdT>) {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/${action.payload}`
    );

    yield put(getUserVacationsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getUserVacationsAsync.failure(err.message!));
    } else {
      yield put(getUserVacationsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleGetUserPastVacationsRequest(action: IReducerAction<UserIdT>) {
  try {
    const res: VacationsDataT[] | any = yield call(
      apiCaller,
      "GET",
      `/vacation/history/${action.payload}`
    );

    yield put(getUserPastVacationsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getUserPastVacationsAsync.failure(err.message!));
    } else {
      yield put(getUserPastVacationsAsync.failure("An unknown error occured."));
    }
  }
}

function* handleCreateUserVacationRequestRequest(
  action: IReducerAction<VacationRequestCreateT>
) {
  try {
    yield delay(2000);
    const res: VacationRequestT | any = yield call(
      apiCaller,
      "POST",
      `/vacation/request/add/${action.payload.userId}`,
      {
        fromDate: action.payload.fromDate,
        toDate: action.payload.toDate,
        reason: action.payload.reason,
        idAbsence: action.payload.idAbsence,
      }
    );
    yield put(createUserVacationRequestAsync.success());
    yield put(
      activateAlert({
        body: `Sukces! Prośba o urlop została pomyślnie wysłana!`,
        variant: "success",
        showTime: 6000,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      yield put(
        activateAlert({
          body: `${err}. Wysłanie prośby o urlop nie powiodło sie.`,
          variant: "danger",
          showTime: 6000,
        })
      );
      yield put(createUserVacationRequestAsync.failure(err.message!));
    } else {
      yield put(
        createUserVacationRequestAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleGetUserVacationRequestsRequest(
  action: IReducerAction<UserIdT>
) {
  try {
    const res: VacationRequestT[] | any = yield call(
      apiCaller,
      "GET",
      `/vacations/requests/${action.payload}`
    );

    yield put(getUserVacationRequestsAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getUserVacationRequestsAsync.failure(err.message!));
    } else {
      yield put(
        getUserVacationRequestsAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleGetUserLeftVacationsDaysRequest(
  action: IReducerAction<UserIdT>
) {
  try {
    const res: LeftVacationsDaysT[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/${action.payload}/left`
    );

    yield put(getUserLeftVacationsDaysAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getUserLeftVacationsDaysAsync.failure(err.message!));
    } else {
      yield put(
        getUserLeftVacationsDaysAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* handleGetAllUsersLeftVacationsDaysRequest() {
  try {
    const res: LeftVacationsDaysT[] | any = yield call(
      apiCaller,
      "GET",
      `/users/vacations/left/all`
    );

    yield put(getAllUsersLeftVacationsDaysAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(getAllUsersLeftVacationsDaysAsync.failure(err.message!));
    } else {
      yield put(
        getAllUsersLeftVacationsDaysAsync.failure("An unknown error occured.")
      );
    }
  }
}

function* watchfetchAllCurrentVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
    handleFetchAllCurrentVacationsRequest
  );
}

function* watchfetchAllPastVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.FETCH_ALL_PAST_VACATIONS,
    handleFetchAllPastVacationsRequest
  );
}

function* watchGetVacationsCategoriesRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_VACATIONS_CATEGORIES,
    handleGetVacationsCategoriesRequest
  );
}

function* watchAddVacationCategoryRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.ADD_VACATION_CATEGORY,
    handleAddVacationCategoryRequest
  );
}

function* watchGetUserVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_USER_VACATIONS,
    handleGetUserVacationsRequest
  );
}

function* watchGetUserPastVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_USER_PAST_VACATIONS,
    handleGetUserPastVacationsRequest
  );
}

function* watchCreateUserVacationRequestRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.CREATE_USER_VACATION_REQUEST,
    handleCreateUserVacationRequestRequest
  );
}

function* watchGetUserVacationRequestsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_USER_VACATION_REQUESTS,
    handleGetUserVacationRequestsRequest
  );
}

function* watchGetUserLeftVacationsDaysRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS,
    handleGetUserLeftVacationsDaysRequest
  );
}

function* watchGetAllUsersLeftVacationsDaysRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_VACATIONS_LEFT_ALL,
    handleGetAllUsersLeftVacationsDaysRequest
  );
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* vacationsSaga() {
  yield all([
    fork(watchfetchAllCurrentVacationsRequest),
    fork(watchfetchAllPastVacationsRequest),
    fork(watchGetVacationsCategoriesRequest),
    fork(watchAddVacationCategoryRequest),
    fork(watchGetUserVacationsRequest),
    fork(watchGetUserPastVacationsRequest),
    fork(watchCreateUserVacationRequestRequest),
    fork(watchGetUserVacationRequestsRequest),
    fork(watchGetUserLeftVacationsDaysRequest),
    fork(watchGetAllUsersLeftVacationsDaysRequest),
  ]);
}
