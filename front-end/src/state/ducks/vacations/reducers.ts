import { VacationsStateT, VacationsActionTypes } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialVacationsState: VacationsStateT = {
  loaded: false
};

export const vacationsReducer = (
  state: VacationsStateT = initialVacationsState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, boolean>
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
    default:
      return state;
  }
};
