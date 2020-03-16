import { AuthStateT, TokenT, AuthActionTypes } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialAuthenticationState: AuthStateT = {
  isAuthenticated: false
};

export const authenticationReducer = (
  state: AuthStateT = initialAuthenticationState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, boolean & string>
): AuthStateT => {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE: {
      return { ...state };
    }
    case AuthActionTypes.AUTHENTICATE_SUCCESS: {
      return { ...state, isAuthenticated: true };
    }
    case AuthActionTypes.AUTHENTICATE_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
