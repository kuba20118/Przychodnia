import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
  VacationRequestT,
  VacationRequestCreateT,
  LeftVacationsDaysT,
  VacationRequestIdT,
} from "./types";
import {
  fetchAllVacationsAsync,
  getVacationsCategoriesAsync,
  getUserVacationsAsync,
  createUserVacationRequestAsync,
  getUserVacationRequestsAsync,
  getUserLeftVacationsDaysAsync,
} from "./actions";
import apiCaller from "../../utils/apiHelper";
import { UserIdT } from "../user/types";
import { IReducerAction } from "..";

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

function* handleCreateUserVacationRequestRequest(
  action: IReducerAction<VacationRequestCreateT>
) {
  try {
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
    yield put(createUserVacationRequestAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
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

    console.log("LEFT", res);

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

function* watchfetchAllCurrentVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
    handleFetchAllCurrentVacationsRequest
  );
}

function* watchGetVacationsCategoriesRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_VACATIONS_CATEGORIES,
    handleGetVacationsCategoriesRequest
  );
}

function* watchGetUserVacationsRequest(): Generator {
  yield takeEvery(
    VacationsActionTypes.GET_USER_VACATIONS,
    handleGetUserVacationsRequest
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

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* vacationsSaga() {
  yield all([
    fork(watchfetchAllCurrentVacationsRequest),
    fork(watchGetVacationsCategoriesRequest),
    fork(watchGetUserVacationsRequest),
    fork(watchCreateUserVacationRequestRequest),
    fork(watchGetUserVacationRequestsRequest),
    fork(watchGetUserLeftVacationsDaysRequest),
  ]);
}
