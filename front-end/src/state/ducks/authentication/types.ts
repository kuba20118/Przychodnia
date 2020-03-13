export type TokenT = string | undefined;

export type AuthenticationStateT = {
  readonly token: TokenT;
  readonly redirectPathOnAuthentication?: string;
};

export enum AuthenticationActionTypes {
  AUTHORIZE_USER = "@@authentication/AUTHORIZE_USER",
  AUTHORIZE_USER_SUCCESS = "@@authentication/AUTHORIZE_USER_SUCCESS",
  AUTHORIZE_USER_ERROR = "@@authentication/AUTHORIZE_USER_ERROR"
}
