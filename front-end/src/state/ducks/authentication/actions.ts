import { createAsyncAction } from "typesafe-actions";
import { AuthenticationActionTypes, TokenT } from "./types";

export const authenticateUserAsync = createAsyncAction(
  AuthenticationActionTypes.AUTHORIZE_USER,
  AuthenticationActionTypes.AUTHORIZE_USER_SUCCESS,
  AuthenticationActionTypes.AUTHORIZE_USER_ERROR
)<undefined, TokenT, string>();
