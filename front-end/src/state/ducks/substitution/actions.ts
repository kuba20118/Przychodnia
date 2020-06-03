import { createAsyncAction } from "typesafe-actions";
import { SubstitutionActionTypes, SubstitutionT } from "./types";

export const getAllSubstitutionsAsync = createAsyncAction(
  SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS,
  SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS_SUCCESS,
  SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS_ERROR
)<undefined, SubstitutionT[], string>();

export const getAllPastSubstitutionsAsync = createAsyncAction(
  SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS,
  SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS_SUCCESS,
  SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS_ERROR
)<undefined, SubstitutionT[], string>();
