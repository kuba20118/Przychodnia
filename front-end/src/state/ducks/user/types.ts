export type UserT = {
  id: string;
  email: string;
};

export type UserStateT = {
  data?: UserT;
};

export enum UserActionTypes {
  LOGIN_USER = "@@user/LOGIN_USER",
  LOGIN_USER_SUCCESS = "@@user/LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "@@user/LOGIN_USER_ERROR",
  REGISTER_USER = "@@user/REGISTER_USER",
  REGISTER_USER_SUCCESS = "@@user/REGISTER_USER_SUCCESS",
  REGISTER_USER_ERROR = "@@user/REGISTER_USER_ERROR"
}
