export type UserIdT = string;

export type UserT = {
  idUser: UserIdT;
  firstName: string;
  lastName: string;
  mail: string;
  role: string;
  workingHours: number;
  currentlyEmployed?: boolean;
  hireDate?: string;
  fireDate?: string;
};

export type LoginApiResponseT = {
  token: string;
  userToReturn: UserT;
};

export type AllUsersApiResponseT = {
  data: UserT[];
};

export type UserLoginT = {
  email: string;
  password: string;
};

export type UserRegisterT = {
  firstName: string;
  lastName: string;
  role: number;
  mail: string;
  password: string;
};

export type UserStateT = {
  currentUser?: UserT;
  users?: UserT[];
  error?: string;
  isLoadingUsers: boolean;
  isLoadingRegistration: boolean;
  isLoadingLogin: boolean;
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
  FETCH_ALL_USERS = "@@user/FETCH_ALL_USERS",
  FETCH_ALL_USERS_SUCCESS = "@@user/FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_ERROR = "@@user/FETCH_ALL_USERS_ERROR",
  SET_CURRENT_USER = "@@user/SET_CURRENT_USER"
}
