import { UserIdT } from "../user/types";

export type VacationsDataT = {
  idUser: string;
  fromDate: string;
  toDate: string;
  absenceType: VacationsCategoryT["name"];
};

export type VacationsCategoryT = {
  idAbsence: number;
  name: string;
  limit: number;
};

export type VacationsFormDataT = {
  fromDate: Date;
  toDate: Date;
  categoryId: number;
  substitutionId: string;
};

export type VacationCreateNewT = {
  userId: string;
  fromDate: Date;
  toDate: Date;
  absenceId: number;
  substitutionId: string;
};

export type VacationRequestIdT = number;
export type VacationRequestT = {
  idRequest: VacationRequestIdT;
  fromDate: string;
  toDate: string;
  reason: string;
  idAbsence: number;
  absence: string;
};

export type VacationRequestCreateT = {
  userId: UserIdT;
  fromDate: string;
  toDate: string;
  reason: string;
  idAbsence: number;
};

export type VacationRequestCreateFormT = {
  fromDate: Date;
  toDate: Date;
  reason: string;
  idAbsence: number;
};

export type VacationRequestSubmitT = {
  fromDate: Date;
  toDate: Date;
  reason: string;
  idAbsence: number;
  substitutionId: string;
};

export type LeftVacationsDaysT = {
  userId: UserIdT;
  leftDays: number;
  vacationType: string;
};

export type VacationsStateT = {
  allVacations: VacationsDataT[];
  allPastVacations: VacationsDataT[];
  userVacations: VacationsDataT[];
  userVacationRequests: VacationRequestT[];
  userLeftVacationsDays: LeftVacationsDaysT[];
  categories: VacationsCategoryT[];
  isLoading: boolean;
  isLoadingUserVacations: boolean;
  isLoadingUserVacationRequests: boolean;
};

export enum VacationsActionTypes {
  FETCH_ALL_CURRENT_VACATIONS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS",
  FETCH_ALL_CURRENT_VACATIONS_SUCCESS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_SUCCESS",
  FETCH_ALL_CURRENT_VACATIONS_ERROR = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_ERROR",

  FETCH_ALL_PAST_VACATIONS = "@@vacations/FETCH_ALL_PAST_VACATIONS",
  FETCH_ALL_PAST_VACATIONS_SUCCESS = "@@vacations/FETCH_ALL_PAST_VACATIONS_SUCCESS",
  FETCH_ALL_PAST_VACATIONS_ERROR = "@@vacations/FETCH_ALL_PAST_VACATIONS_ERROR",

  GET_VACATIONS_CATEGORIES = "@@vacations/GET_VACATIONS_CATEGORIES",
  GET_VACATIONS_CATEGORIES_SUCCESS = "@@vacations/GET_VACATIONS_CATEGORIES_SUCCESS",
  GET_VACATIONS_CATEGORIES_ERROR = "@@vacations/GET_VACATIONS_CATEGORIES_ERROR",
  GET_USER_VACATIONS = "@@user/GET_USER_VACATIONS",
  GET_USER_VACATIONS_SUCCESS = "@@user/GET_USER_VACATIONS_SUCCESS",
  GET_USER_VACATIONS_ERROR = "@@user/GET_USER_VACATIONS_ERROR",
  CREATE_USER_VACATION_REQUEST = "@@user/CREATE_USER_VACATION_REQUEST",
  CREATE_USER_VACATION_REQUEST_SUCCESS = "@@user/CREATE_USER_VACATION_REQUEST_SUCCESS",
  CREATE_USER_VACATION_REQUEST_ERROR = "@@user/CREATE_USER_VACATION_REQUEST_ERROR",

  GET_USER_VACATION_REQUESTS = "@@user/GET_USER_VACATION_REQUESTS",
  GET_USER_VACATION_REQUESTS_SUCCESS = "@@user/GET_USER_VACATION_REQUESTS_SUCCESS",
  GET_USER_VACATION_REQUESTS_ERROR = "@@user/GET_USER_VACATION_REQUESTS_ERROR",
  GET_USER_LEFT_VACATIONS_DAYS = "@@user/GET_USER_LEFT_VACATIONS_DAYS",
  GET_USER_LEFT_VACATIONS_DAYS_SUCCESS = "@@user/GET_USER_LEFT_VACATIONS_DAYS_SUCCESS",
  GET_USER_LEFT_VACATIONS_DAYS_ERROR = "@@user/GET_USER_LEFT_VACATIONS_DAYS_ERROR",
}
