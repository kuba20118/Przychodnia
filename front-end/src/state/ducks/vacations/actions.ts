import { createAsyncAction } from "typesafe-actions";
import { VacationsActionTypes, VacationsDataT } from "./types";

export const createVacationsAsync = createAsyncAction(
  VacationsActionTypes.CREATE_VACATIONS,
  VacationsActionTypes.CREATE_VACATIONS_SUCCESS,
  VacationsActionTypes.CREATE_VACATIONS_ERROR
)<VacationsDataT, undefined, string>();
