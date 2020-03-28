import { VacationsStateT, VacationsActionTypes, VacationsDataT } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialVacationsState: VacationsStateT = {
  allVacations: [],
  types: [],
  isLoading: false
};

export const vacationsReducer = (
  state: VacationsStateT = initialVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, VacationsDataT[] & string[]>
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
    case VacationsActionTypes.GET_VACATIONS_TYPES: {
      return { ...initialVacationsState, isLoading: true };
    }
    case VacationsActionTypes.GET_VACATIONS_TYPES_SUCCESS: {
      return { ...state, isLoading: false, types: action.payload };
    }
    case VacationsActionTypes.GET_VACATIONS_TYPES_ERROR: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
