import { UserT, UserStateT, UserActionTypes } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialUserState: UserStateT = {};

export const userReducer = (
  state: UserStateT = initialUserState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, UserT>
): UserStateT => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER: {
      return { ...state };
    }
    case UserActionTypes.LOGIN_USER_SUCCESS: {
      return { ...state, data: action.payload };
    }
    case UserActionTypes.LOGIN_USER_ERROR: {
      return { ...state };
    }
    case UserActionTypes.REGISTER_USER: {
      return { ...state };
    }
    case UserActionTypes.REGISTER_USER_SUCCESS: {
      return { ...state, data: action.payload };
    }
    case UserActionTypes.REGISTER_USER_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
