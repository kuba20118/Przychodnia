import {
  VacationsStateT,
  VacationsActionTypes,
  VacationsDataT,
  VacationsCategoryT,
  VacationRequestT,
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialVacationsState: VacationsStateT = {
  allVacations: [],
  userVacations: [],
  userVacationRequests: [],
  categories: [],
  isLoading: false,
  isLoadingUserVacations: false,
  isLoadingUserVacationRequests: false,
};

export const vacationsReducer = (
  state: VacationsStateT = initialVacationsState,
  action: Action<TypeConstant> &
    PayloadAction<
      TypeConstant,
      VacationsDataT[] &
        VacationsCategoryT[] &
        VacationRequestT[] &
        VacationRequestT
    >
): VacationsStateT => {
  switch (action.type) {
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS: {
      return { ...state, isLoading: true };
    }
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_SUCCESS: {
      return { ...state, isLoading: false, allVacations: action.payload };
    }
    case VacationsActionTypes.FETCH_ALL_CURRENT_VACATIONS_ERROR: {
      return { ...state, isLoading: false };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES: {
      return { ...state, isLoading: true };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES_SUCCESS: {
      return { ...state, isLoading: false, categories: action.payload };
    }
    case VacationsActionTypes.GET_VACATIONS_CATEGORIES_ERROR: {
      return { ...state, isLoading: false };
    }
    case VacationsActionTypes.GET_USER_VACATIONS: {
      return { ...state, isLoadingUserVacations: true };
    }
    case VacationsActionTypes.GET_USER_VACATIONS_SUCCESS: {
      return {
        ...state,
        isLoadingUserVacations: false,
        userVacations: action.payload,
      };
    }
    case VacationsActionTypes.GET_USER_VACATIONS_ERROR: {
      return { ...state, isLoadingUserVacations: false };
    }
    case VacationsActionTypes.CREATE_USER_VACATION_REQUEST: {
      return { ...state };
    }
    case VacationsActionTypes.CREATE_USER_VACATION_REQUEST_SUCCESS: {
      return {
        ...state,
        userVacationRequests: [...state.userVacationRequests, action.payload],
      };
    }
    case VacationsActionTypes.CREATE_USER_VACATION_REQUEST_ERROR: {
      return { ...state };
    }
    case VacationsActionTypes.GET_USER_VACATION_REQUESTS: {
      return { ...state, isLoadingUserVacationRequests: true };
    }
    case VacationsActionTypes.GET_USER_VACATION_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoadingUserVacationRequests: false,
        userVacationRequests: action.payload,
      };
    }
    case VacationsActionTypes.GET_USER_VACATION_REQUESTS_ERROR: {
      return { ...state, isLoadingUserVacationRequests: false };
    }
    default:
      return state;
  }
};
