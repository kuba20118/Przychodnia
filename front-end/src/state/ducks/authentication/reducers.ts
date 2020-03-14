import {
  AuthenticationStateT,
  TokenT,
  AuthenticationActionTypes
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialAuthenticationState: AuthenticationStateT = {
  token: undefined,
  isAuthenticated: false
};

export const authenticationReducer = (
  state: AuthenticationStateT = initialAuthenticationState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, TokenT & string>
): AuthenticationStateT => {
  switch (action.type) {
    case AuthenticationActionTypes.AUTHENTICATE_USER: {
      return { ...state };
    }
    case AuthenticationActionTypes.AUTHENTICATE_USER_SUCCESS: {
      return { ...state, token: action.payload, isAuthenticated: true };
    }
    case AuthenticationActionTypes.AUTHENTICATE_USER_ERROR: {
      return { ...state };
    }
    case AuthenticationActionTypes.SET_REDIRECT_PATH_ON_AUTHENTICATION: {
      return { ...state, redirectPathOnAuthentication: action.payload };
    }
    default:
      return state;
  }
};
