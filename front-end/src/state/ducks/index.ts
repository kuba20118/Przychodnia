import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { Action, TypeConstant, PayloadAction } from "typesafe-actions";
import { AuthStateT } from "./auth/types";
import { UserStateT } from "./user/types";
import { authenticationReducer } from "./auth/reducers";
import { userReducer } from "./user/reducers";
import userSaga from "./user/sagas";
import authenticationSaga from "./auth/sagas";
import { workerLeaveReducer } from "./worker-leave/reducers";
import workerLeaveSaga from "./worker-leave/sagas";
import { WorkerLeaveStateT } from "./worker-leave/types";

export interface IApplicationState {
  authentication: AuthStateT;
  user: UserStateT;
  workerLeave: WorkerLeaveStateT;
}

export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<IApplicationState>({
  authentication: authenticationReducer,
  user: userReducer,
  workerLeave: workerLeaveReducer
});

export function* rootSaga() {
  yield all([fork(userSaga), fork(authenticationSaga), fork(workerLeaveSaga)]);
}
