import {
  UserStateT,
  UserActionTypes,
  UserApiResponseT,
  AllUsersApiResponseT
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialUserState: UserStateT = {
  loaded: false
};

export const userReducer = (
  state: UserStateT = initialUserState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, UserApiResponseT & AllUsersApiResponseT>
): UserStateT => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER: {
      return { ...state, loaded: false };
    }
    case UserActionTypes.LOGIN_USER_SUCCESS: {
      return { ...state, currentUser: action.payload.data!, loaded: true };
    }
    case UserActionTypes.LOGIN_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.LOGOUT_USER: {
      return { ...state };
    }
    case UserActionTypes.LOGOUT_USER_SUCCESS: {
      return { ...initialUserState, currentUser: undefined, loaded: true };
    }
    case UserActionTypes.LOGOUT_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.REGISTER_USER: {
      return { ...state, loaded: false };
    }
    case UserActionTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        users: [...state.users!, ...action.payload.data!],
        loaded: true
      };
    }
    case UserActionTypes.REGISTER_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.FETCH_CURRENT_USER: {
      return { ...state, loaded: false };
    }
    case UserActionTypes.FETCH_CURRENT_USER_SUCCESS: {
      return { ...state, currentUser: action.payload.data!, loaded: true };
    }
    case UserActionTypes.FETCH_CURRENT_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.FETCH_ALL_USERS: {
      return { ...state, loaded: false };
    }
    case UserActionTypes.FETCH_ALL_USERS_SUCCESS: {
      return { ...state, users: action.payload.data!, loaded: true };
    }
    case UserActionTypes.FETCH_ALL_USERS_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
