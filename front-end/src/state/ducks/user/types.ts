export type UserT = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserApiResponseT = {
  data: UserT;
  token: string;
};

export type AllUsersApiResponseT = {
  data: UserT[];
  length: number;
};

export type UserStateT = {
  data?: UserT;
  loaded: boolean;
};

export type UserCredentialsT = {
  email: string;
  password: string;
};

export enum UserActionTypes {
  LOGIN_USER = "@@user/LOGIN_USER",
  LOGIN_USER_SUCCESS = "@@user/LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR = "@@user/LOGIN_USER_ERROR",
  LOGOUT_USER = "@@user/LOGOUT_USER",
  LOGOUT_USER_SUCCESS = "@@user/LOGOUT_USER_SUCCESS",
  LOGOUT_USER_ERROR = "@@user/LOGOUT_USER_ERROR",
  REGISTER_USER = "@@user/REGISTER_USER",
  REGISTER_USER_SUCCESS = "@@user/REGISTER_USER_SUCCESS",
  REGISTER_USER_ERROR = "@@user/REGISTER_USER_ERROR",
  FETCH_CURRENT_USER = "@@user/FETCH_CURRENT_USER",
  FETCH_CURRENT_USER_SUCCESS = "@@user/FETCH_CURRENT_USER_SUCCESS",
  FETCH_CURRENT_USER_ERROR = "@@user/FETCH_CURRENT_USER_ERROR",
  FETCH_ALL_USERS = "@@user/FETCH_ALL_USERS",
  FETCH_ALL_USERS_SUCCESS = "@@user/FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_ERROR = "@@user/FETCH_ALL_USERS_ERROR"
}
