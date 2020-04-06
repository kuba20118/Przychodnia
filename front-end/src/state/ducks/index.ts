import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { Action, TypeConstant, PayloadAction } from "typesafe-actions";
import { AuthStateT } from "./auth/types";
import { UserStateT } from "./user/types";
import { authenticationReducer } from "./auth/reducers";
import { userReducer } from "./user/reducers";
import userSaga from "./user/sagas";
import authenticationSaga from "./auth/sagas";
import { vacationsReducer } from "./vacations/reducers";
import vacationsSaga from "./vacations/sagas";
import { VacationsStateT } from "./vacations/types";
import { SelectedWorkerStateT } from "./selected-worker/types";
import { selectedWorkerReducer } from "./selected-worker/reducers";
import selectedWorkerSaga from "./selected-worker/sagas";
import roleSaga from "./role/sagas";
import { RoleStateT } from "./role/types";
import { roleReducer } from "./role/reducers";
import { AlertStateT } from "./alert/types";
import { alertReducer } from "./alert/reducers";
import alertSaga from "./alert/sagas";

export interface IApplicationState {
  authentication: AuthStateT;
  user: UserStateT;
  selectedWorker: SelectedWorkerStateT;
  vacations: VacationsStateT;
  role: RoleStateT;
  alert: AlertStateT;
}

export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<IApplicationState>({
  authentication: authenticationReducer,
  user: userReducer,
  selectedWorker: selectedWorkerReducer,
  vacations: vacationsReducer,
  role: roleReducer,
  alert: alertReducer,
});

export function* rootSaga() {
  yield all([
    fork(authenticationSaga),
    fork(userSaga),
    fork(selectedWorkerSaga),
    fork(vacationsSaga),
    fork(roleSaga),
    fork(alertSaga),
  ]);
}
