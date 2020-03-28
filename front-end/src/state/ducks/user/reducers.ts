import {
  UserStateT,
  UserActionTypes,
  AllUsersApiResponseT,
  UserT,
  UserIdT
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialUserState: UserStateT = {
  isLoadingUsers: false,
  isLoadingRegistration: false,
  isLoadingLogin: false
};

export const userReducer = (
  state: UserStateT = initialUserState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, UserT & UserT[] & string>
): UserStateT => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER: {
      return { ...state, isLoadingLogin: true };
    }
    case UserActionTypes.LOGIN_USER_SUCCESS: {
      return { ...state, currentUser: action.payload, isLoadingLogin: false };
    }
    case UserActionTypes.LOGIN_USER_ERROR: {
      return { ...state, error: action.payload, isLoadingLogin: false };
    }
    case UserActionTypes.LOGOUT_USER: {
      return { ...state };
    }
    case UserActionTypes.LOGOUT_USER_SUCCESS: {
      return { ...initialUserState, currentUser: undefined };
    }
    case UserActionTypes.LOGOUT_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.REGISTER_USER: {
      return { ...state, isLoadingRegistration: true };
    }
    case UserActionTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        users: [...state.users!, action.payload],
        isLoadingRegistration: false
      };
    }
    case UserActionTypes.REGISTER_USER_ERROR: {
      return { ...state, isLoadingRegistration: false };
    }

    case UserActionTypes.FETCH_ALL_USERS: {
      return { ...state, isLoadingUsers: true };
    }
    case UserActionTypes.FETCH_ALL_USERS_SUCCESS: {
      return { ...state, users: action.payload, isLoadingUsers: false };
    }
    case UserActionTypes.FETCH_ALL_USERS_ERROR: {
      return { ...state, isLoadingUsers: false };
    }
    case UserActionTypes.SET_CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }
    default:
      return state;
  }
};
