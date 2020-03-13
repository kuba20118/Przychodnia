import {
  AuthenticationStateT,
  TokenT,
  AuthenticationActionTypes
} from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialAuthenticationState: AuthenticationStateT = {
  token: undefined
};

export const authenticationReducer = (
  state: AuthenticationStateT = initialAuthenticationState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, TokenT>
): AuthenticationStateT => {
  switch (action.type) {
    case AuthenticationActionTypes.AUTHORIZE_USER: {
      return { ...state, redirectPathOnAuthentication: action.payload };
    }
    case AuthenticationActionTypes.AUTHORIZE_USER_SUCCESS: {
      return { ...state, token: action.payload };
    }
    case AuthenticationActionTypes.AUTHORIZE_USER_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
