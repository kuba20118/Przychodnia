import { createAsyncAction } from "typesafe-actions";
import {
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
} from "./types";

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
