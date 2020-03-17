import { createAsyncAction, action } from "typesafe-actions";
import { AuthActionTypes } from "./types";

export const authenticateAsync = createAsyncAction(
  AuthActionTypes.AUTHENTICATE,
  AuthActionTypes.AUTHENTICATE_SUCCESS,
  AuthActionTypes.AUTHENTICATE_ERROR
)<undefined, undefined, string>();

export const setAuthFalse = () => action(AuthActionTypes.SET_AUTH_FALSE);
