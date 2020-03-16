import { createAsyncAction } from "typesafe-actions";
import { AuthActionTypes } from "./types";

export const authenticateAsync = createAsyncAction(
  AuthActionTypes.AUTHENTICATE,
  AuthActionTypes.AUTHENTICATE_SUCCESS,
  AuthActionTypes.AUTHENTICATE_ERROR
)<undefined, undefined, string>();
