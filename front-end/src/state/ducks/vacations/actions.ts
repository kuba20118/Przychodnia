import { createAsyncAction } from "typesafe-actions";
import {
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
  VacationRequestT,
  LeftVacationsDaysT,
  VacationRequestCreateT,
  VacationCategoryCreateT,
  UserLeftVacationDays,
} from "./types";
import { UserIdT } from "../user/types";

export const fetchAllVacationsAsync = createAsyncAction(
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_SUCCESS,
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_ERROR
)<undefined, VacationsDataT[], string>();

export const fetchAllPastVacationsAsync = createAsyncAction(
  VacationsActionTypes.FETCH_ALL_PAST_VACATIONS,
  VacationsActionTypes.FETCH_ALL_PAST_VACATIONS_SUCCESS,
  VacationsActionTypes.FETCH_ALL_PAST_VACATIONS_ERROR
)<undefined, VacationsDataT[], string>();

export const getVacationsCategoriesAsync = createAsyncAction(
  VacationsActionTypes.GET_VACATIONS_CATEGORIES,
  VacationsActionTypes.GET_VACATIONS_CATEGORIES_SUCCESS,
  VacationsActionTypes.GET_VACATIONS_CATEGORIES_ERROR
)<undefined, VacationsCategoryT[], string>();

export const addVacationCategoryAsync = createAsyncAction(
  VacationsActionTypes.ADD_VACATION_CATEGORY,
  VacationsActionTypes.ADD_VACATION_CATEGORY_SUCCESS,
  VacationsActionTypes.ADD_VACATION_CATEGORY_ERROR
)<VacationCategoryCreateT, VacationsCategoryT, string>();

export const getUserVacationsAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_VACATIONS,
  VacationsActionTypes.GET_USER_VACATIONS_SUCCESS,
  VacationsActionTypes.GET_USER_VACATIONS_ERROR
)<UserIdT, VacationsDataT[], string>();

export const getUserPastVacationsAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_PAST_VACATIONS,
  VacationsActionTypes.GET_USER_PAST_VACATIONS_SUCCESS,
  VacationsActionTypes.GET_USER_PAST_VACATIONS_ERROR
)<UserIdT, VacationsDataT[], string>();

export const createUserVacationRequestAsync = createAsyncAction(
  VacationsActionTypes.CREATE_USER_VACATION_REQUEST,
  VacationsActionTypes.CREATE_USER_VACATION_REQUEST_SUCCESS,
  VacationsActionTypes.CREATE_USER_VACATION_REQUEST_ERROR
)<VacationRequestCreateT, undefined, string>();

export const getUserLeftVacationsDaysAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS,
  VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS_SUCCESS,
  VacationsActionTypes.GET_USER_LEFT_VACATIONS_DAYS_ERROR
)<UserIdT, LeftVacationsDaysT[], string>();

export const getAllUsersLeftVacationsDaysAsync = createAsyncAction(
  VacationsActionTypes.GET_VACATIONS_LEFT_ALL,
  VacationsActionTypes.GET_VACATIONS_LEFT_ALL_SUCCESS,
  VacationsActionTypes.GET_VACATIONS_LEFT_ALL_ERROR
)<undefined, UserLeftVacationDays[], string>();

export const getUserVacationRequestsAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_VACATION_REQUESTS,
  VacationsActionTypes.GET_USER_VACATION_REQUESTS_SUCCESS,
  VacationsActionTypes.GET_USER_VACATION_REQUESTS_ERROR
)<UserIdT, VacationRequestT[], string>();
