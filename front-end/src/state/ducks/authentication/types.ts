export type TokenT = string | undefined;

export type AuthenticationStateT = {
  readonly isAuthenticated: boolean;
  readonly token: TokenT;
  readonly redirectPathOnAuthentication?: string;
};

export enum AuthenticationActionTypes {
  AUTHENTICATE_USER = "@@authentication/AUTHENTICATE_USER",
  AUTHENTICATE_USER_SUCCESS = "@@authentication/AUTHENTICATE_USER_SUCCESS",
  AUTHENTICATE_USER_ERROR = "@@authentication/AUTHENTICATE_USER_ERROR",
  // SET_IS_AUTHENTICATED = "@@authentication/SET_IS_AUTHENTICATED",
  // SET_IS_AUTHENTICATED_SUCCESS = "@@authentication/SET_IS_AUTHENTICATED_SUCCESS",
  // SET_IS_AUTHENTICATED_ERROR = "@@authentication/SET_IS_AUTHENTICATED_ERROR",
  SET_REDIRECT_PATH_ON_AUTHENTICATION = "@@authentication/SET_REDIRECT_PATH_ON_AUTHENTICATION"
  // SET_REDIRECT_PATH_ON_AUTHENTICATION_SUCCESS = "@@authentication/SET_REDIRECT_PATH_ON_AUTHENTICATION_SUCCESS",
  // SET_REDIRECT_PATH_ON_AUTHENTICATION_ERROR = "@@authentication/SET_REDIRECT_PATH_ON_AUTHENTICATION_ERROR"
}
