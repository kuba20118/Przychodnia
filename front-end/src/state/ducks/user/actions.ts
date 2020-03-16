import { createAsyncAction } from "typesafe-actions";
import {
  UserActionTypes,
  UserT,
  UserCredentialsT,
  UserApiResponseT
} from "./types";
import { TokenT } from "../auth/types";

export const loginUserAsync = createAsyncAction(
  UserActionTypes.LOGIN_USER,
  UserActionTypes.LOGIN_USER_SUCCESS,
  UserActionTypes.LOGIN_USER_ERROR
)<UserCredentialsT, UserT, string>();

export const registerUserAsync = createAsyncAction(
  UserActionTypes.REGISTER_USER,
  UserActionTypes.REGISTER_USER_SUCCESS,
  UserActionTypes.REGISTER_USER_ERROR
)<UserT, UserApiResponseT, string>();

export const fetchCurrentUserAsync = createAsyncAction(
  UserActionTypes.FETCH_CURRENT_USER,
  UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
  UserActionTypes.FETCH_CURRENT_USER_ERROR
)<TokenT, UserApiResponseT, string>();
