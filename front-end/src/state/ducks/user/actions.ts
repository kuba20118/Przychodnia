import { createAsyncAction } from "typesafe-actions";
import {
  UserActionTypes,
  UserT,
  UserCredentialsT,
  TokenApiResponseT,
  AllUsersApiResponseT
} from "./types";
import { TokenT } from "../auth/types";

export const loginUserAsync = createAsyncAction(
  UserActionTypes.LOGIN_USER,
  UserActionTypes.LOGIN_USER_SUCCESS,
  UserActionTypes.LOGIN_USER_ERROR
)<UserCredentialsT, TokenApiResponseT, string>();

export const logoutUserAsync = createAsyncAction(
  UserActionTypes.LOGOUT_USER,
  UserActionTypes.LOGOUT_USER_SUCCESS,
  UserActionTypes.LOGOUT_USER_ERROR
)<undefined, undefined, string>();

export const registerUserAsync = createAsyncAction(
  UserActionTypes.REGISTER_USER,
  UserActionTypes.REGISTER_USER_SUCCESS,
  UserActionTypes.REGISTER_USER_ERROR
)<UserT, undefined, string>();

export const fetchCurrentUserAsync = createAsyncAction(
  UserActionTypes.FETCH_CURRENT_USER,
  UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
  UserActionTypes.FETCH_CURRENT_USER_ERROR
)<TokenT, UserT, string>();

export const fetchAllUsersAsync = createAsyncAction(
  UserActionTypes.FETCH_ALL_USERS,
  UserActionTypes.FETCH_ALL_USERS_SUCCESS,
  UserActionTypes.FETCH_ALL_USERS_ERROR
)<undefined, AllUsersApiResponseT, string>();

export const searchUsersAsync = createAsyncAction(
  UserActionTypes.SEARCH_USERS,
  UserActionTypes.SEARCH_USERS_SUCCESS,
  UserActionTypes.SEARCH_USERS_ERROR
)<string, AllUsersApiResponseT, string>();
