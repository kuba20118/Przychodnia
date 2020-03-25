import { createAsyncAction } from "typesafe-actions";
import { VacationsActionTypes, VacationsDataT } from "./types";
import { UserIdT } from "../user/types";

export const createVacationsAsync = createAsyncAction(
  VacationsActionTypes.CREATE_VACATIONS,
  VacationsActionTypes.CREATE_VACATIONS_SUCCESS,
  VacationsActionTypes.CREATE_VACATIONS_ERROR
)<VacationsDataT, undefined, string>();

export const fetchAllVacationsAsync = createAsyncAction(
  VacationsActionTypes.FETCH_ALL_VACATIONS,
  VacationsActionTypes.FETCH_ALL_VACATIONS_SUCCESS,
  VacationsActionTypes.FETCH_ALL_VACATIONS_ERROR
)<undefined, VacationsDataT[], string>();

export const getUserVacationsAsync = createAsyncAction(
  VacationsActionTypes.GET_USER_VACATIONS,
  VacationsActionTypes.GET_USER_VACATIONS_SUCCESS,
  VacationsActionTypes.GET_USER_VACATIONS_ERROR
)<UserIdT, VacationsDataT[], string>();
