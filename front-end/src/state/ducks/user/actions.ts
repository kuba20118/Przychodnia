import { createAsyncAction } from "typesafe-actions";
import { UserActionTypes, UserT } from "./types";

export const loginUserAsync = createAsyncAction(
  UserActionTypes.LOGIN_USER,
  UserActionTypes.LOGIN_USER_SUCCESS,
  UserActionTypes.LOGIN_USER_ERROR
)<undefined, UserT, string>();
