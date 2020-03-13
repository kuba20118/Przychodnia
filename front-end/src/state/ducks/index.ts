import { combineReducers } from "redux";
import { Action, TypeConstant, PayloadAction } from "typesafe-actions";
import { AuthenticationStateT } from "./authentication/types";
import { UserStateT } from "./user/types";
import { authenticationReducer } from "./authentication/reducers";
import { userReducer } from "./user/reducers";

export interface IApplicationState {
  authentication: AuthenticationStateT;
  user: UserStateT;
}

export interface IReducerAction<TPayload>
  extends Action<TypeConstant>,
    PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<IApplicationState>({
  authentication: authenticationReducer,
  user: userReducer
});

export function* rootSaga() {}
