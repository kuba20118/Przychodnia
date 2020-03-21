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

export interface IApplicationState {
  authentication: AuthStateT;
  user: UserStateT;
  vacations: VacationsStateT;
}

export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<IApplicationState>({
  authentication: authenticationReducer,
  user: userReducer,
  vacations: vacationsReducer
});

export function* rootSaga() {
  yield all([fork(userSaga), fork(authenticationSaga), fork(vacationsSaga)]);
}
