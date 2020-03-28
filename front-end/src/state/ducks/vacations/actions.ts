import { createAsyncAction } from "typesafe-actions";
import { VacationsActionTypes, VacationsDataT } from "./types";

export const fetchAllVacationsAsync = createAsyncAction(
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS,
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_SUCCESS,
  VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_ERROR
)<undefined, VacationsDataT[], string>();

export const getVacationsTypesAsync = createAsyncAction(
  VacationsActionTypes.GET_VACATIONS_TYPES,
  VacationsActionTypes.GET_VACATIONS_TYPES_SUCCESS,
  VacationsActionTypes.GET_VACATIONS_TYPES_ERROR
)<undefined, string[], string>();
