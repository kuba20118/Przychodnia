import { UserStateT, UserActionTypes, UserApiResponseT } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialUserState: UserStateT = {
  loaded: false
};

export const userReducer = (
  state: UserStateT = initialUserState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, UserApiResponseT>
): UserStateT => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER: {
      return { ...state };
    }
    case UserActionTypes.LOGIN_USER_SUCCESS: {
      return { ...state, data: action.payload.data!, loaded: true };
    }
    case UserActionTypes.LOGIN_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.REGISTER_USER: {
      return { ...state };
    }
    case UserActionTypes.REGISTER_USER_SUCCESS: {
      return { ...state, data: action.payload.data!, loaded: true };
    }
    case UserActionTypes.REGISTER_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.FETCH_CURRENT_USER: {
      return { ...state };
    }
    case UserActionTypes.FETCH_CURRENT_USER_SUCCESS: {
      return { ...state, data: action.payload.data!, loaded: true };
    }
    case UserActionTypes.FETCH_CURRENT_USER_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
