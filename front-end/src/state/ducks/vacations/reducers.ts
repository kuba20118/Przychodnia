import { VacationsStateT, VacationsActionTypes, VacationsDataT } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialVacationsState: VacationsStateT = {
  allVacations: [],
  userVacations: [],
  loaded: false
};

export const vacationsReducer = (
  state: VacationsStateT = initialVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, VacationsDataT[] & boolean>
): VacationsStateT => {
  switch (action.type) {
    case VacationsActionTypes.CREATE_VACATIONS: {
      return { ...initialVacationsState };
    }
    case VacationsActionTypes.CREATE_VACATIONS_SUCCESS: {
      return { ...state, loaded: true };
    }
    case VacationsActionTypes.CREATE_VACATIONS_ERROR: {
      return { ...initialVacationsState };
    }
    case VacationsActionTypes.FETCH_ALL_VACATIONS: {
      return { ...initialVacationsState };
    }
    case VacationsActionTypes.FETCH_ALL_VACATIONS_SUCCESS: {
      return { ...state, loaded: true, allVacations: action.payload };
    }
    case VacationsActionTypes.FETCH_ALL_VACATIONS_ERROR: {
      return { ...initialVacationsState };
    }
    case VacationsActionTypes.GET_USER_VACATIONS: {
      return { ...initialVacationsState };
    }
    case VacationsActionTypes.GET_USER_VACATIONS_SUCCESS: {
      return { ...state, loaded: true, userVacations: action.payload };
    }
    case VacationsActionTypes.GET_USER_VACATIONS_ERROR: {
      return { ...initialVacationsState };
    }
    default:
      return state;
  }
};
