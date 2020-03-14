import { createAsyncAction, action } from "typesafe-actions";
import { AuthenticationActionTypes, TokenT } from "./types";

export const authenticateUserAsync = createAsyncAction(
  AuthenticationActionTypes.AUTHENTICATE_USER,
  AuthenticationActionTypes.AUTHENTICATE_USER_SUCCESS,
  AuthenticationActionTypes.AUTHENTICATE_USER_ERROR
)<undefined, TokenT, string>();

// export const setIsAuthenticatedAsync = createAsyncAction(
//          AuthenticationActionTypes.SET_IS_AUTHENTICATED,
//          AuthenticationActionTypes.SET_IS_AUTHENTICATED_SUCCESS,
//          AuthenticationActionTypes.SET_IS_AUTHENTICATED_ERROR
//        )<undefined, TokenT, string>();

export const setRedirectPathOnAuthenticationAction = (path: string) =>
  action(AuthenticationActionTypes.SET_REDIRECT_PATH_ON_AUTHENTICATION, path);
