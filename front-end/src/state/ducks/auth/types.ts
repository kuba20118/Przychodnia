export type TokenT = string | undefined;

export type AuthStateT = {
  readonly isAuthenticated: boolean;
};

export enum AuthActionTypes {
  AUTHENTICATE = "@@authentication/AUTHENTICATE",
  AUTHENTICATE_SUCCESS = "@@authentication/AUTHENTICATE_SUCCESS",
  AUTHENTICATE_ERROR = "@@authentication/AUTHENTICATE_ERROR"
}
