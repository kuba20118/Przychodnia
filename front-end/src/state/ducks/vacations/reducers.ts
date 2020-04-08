import {
  VacationsStateT,
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialVacationsState: VacationsStateT = {
  allVacations: [],
  categories: [],
  isLoading: false,
};

export const vacationsReducer = (
  state: VacationsStateT = initialVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, VacationsDataT[] & VacationsCategoryT[]>
): VacationsStateT => {
  switch (action.type) {
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS: {
      return { ...initialVacationsState, isLoading: true };
    }
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_SUCCESS: {
      return { ...state, isLoading: false, allVacations: action.payload };
    }
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_ERROR: {
      return { ...state, isLoading: false };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES: {
      return { ...initialVacationsState, isLoading: true };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES_SUCCESS: {
      return { ...state, isLoading: false, categories: action.payload };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES_ERROR: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
