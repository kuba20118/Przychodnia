import { createAsyncAction, action } from "typesafe-actions";
import {
  UserActionTypes,
  UserT,
  UserLoginT,
  LoginApiResponseT,
  AllUsersApiResponseT,
  UserRegisterT
} from "./types";

export const loginUserAsync = createAsyncAction(
  UserActionTypes.LOGIN_USER,
  UserActionTypes.LOGIN_USER_SUCCESS,
  UserActionTypes.LOGIN_USER_ERROR
)<UserLoginT, LoginApiResponseT, string>();

export const logoutUserAsync = createAsyncAction(
  UserActionTypes.LOGOUT_USER,
  UserActionTypes.LOGOUT_USER_SUCCESS,
  UserActionTypes.LOGOUT_USER_ERROR
)<undefined, undefined, string>();

export const registerUserAsync = createAsyncAction(
  UserActionTypes.REGISTER_USER,
  UserActionTypes.REGISTER_USER_SUCCESS,
  UserActionTypes.REGISTER_USER_ERROR
)<UserRegisterT, UserT, string>();

export const fetchAllUsersAsync = createAsyncAction(
  UserActionTypes.FETCH_ALL_USERS,
  UserActionTypes.FETCH_ALL_USERS_SUCCESS,
  UserActionTypes.FETCH_ALL_USERS_ERROR
)<undefined, AllUsersApiResponseT, string>();
