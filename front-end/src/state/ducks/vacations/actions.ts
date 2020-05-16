import { createAsyncAction } from "typesafe-actions";
import {
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
  VacationRequestT,
} from "./types";
import { UserIdT } from "../user/types";

export const fetchAllVacationsAsync = createAsyncAction(
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_SUCCESS,
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_ERROR
)<undefined, VacationsDataT[], string>();

export const getVacationsCategoriesAsync = createAsyncAction(
  VacationsActionTypes.GET_VACATIONS_CATEGORIES,
  VacationsActionTypes.GET_VACATIONS_CATEGORIES_SUCCESS,
  VacationsActionTypes.GET_VACATIONS_CATEGORIES_ERROR
)<undefined, VacationsCategoryT[], string>();

export const getUserVacationsAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_VACATIONS,
  VacationsActionTypes.GET_USER_VACATIONS_SUCCESS,
  VacationsActionTypes.GET_USER_VACATIONS_ERROR
)<UserIdT, VacationsDataT[], string>();

export const createUserVacationRequestAsync = createAsyncAction(
  VacationsActionTypes.CREATE_USER_VACATION_REQUEST,
  VacationsActionTypes.CREATE_USER_VACATION_REQUEST_SUCCESS,
  VacationsActionTypes.CREATE_USER_VACATION_REQUEST_ERROR
)<VacationRequestT, VacationRequestT, string>();

export const getUserVacationRequestsAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_VACATION_REQUESTS,
  VacationsActionTypes.GET_USER_VACATION_REQUESTS_SUCCESS,
  VacationsActionTypes.GET_USER_VACATION_REQUESTS_ERROR
)<UserIdT, VacationRequestT[], string>();
