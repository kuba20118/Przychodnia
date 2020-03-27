import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { RoleT, RoleActionTypes } from "./types";
import { fetchRoleAsync, addRoleAsync } from "./actions";
import { IReducerAction } from "..";
import apiCaller from "../../utils/apiHelper";

function* handleFetchRole() {
  try {
    const res: any = yield call(apiCaller, "GET", "/dictionarydata/roles");

    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    const Role: RoleT[] = res.map((role: any) => ({
      idRole: role.idRole,
      name: role.name
    }));

    yield put(fetchRoleAsync.success(Role));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchRoleAsync.failure(err.message!));
    } else {
      yield put(fetchRoleAsync.failure("An unknown error occured."));
    }
  }
}

function* handleAddRole(action: IReducerAction<RoleT>) {
  try {
    const res: any = yield call(
      apiCaller,
      "POST",
      `/dictionarydata/Role/add`,
      {}
    );

    if (res.errors) {
      throw Error(res.errors.id[0]);
    }

    // yield put(addRoleAsync.success(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(addRoleAsync.failure(err.message!));
    } else {
      yield put(addRoleAsync.failure("An unknown error occured."));
    }
  }
}

function* watchFetchRole(): Generator {
  yield takeEvery(RoleActionTypes.FETCH_ROLES, handleFetchRole);
}

function* watchAddRole(): Generator {
  yield takeEvery(RoleActionTypes.ADD_ROLE, handleAddRole);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* RoleSaga() {
  yield all([fork(watchFetchRole), fork(watchAddRole)]);
}
