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

export type VacationRequestT = {
  idRequest: number;
  fromDate: string;
  toDate: string;
  reason: string;
  idAbsence: number;
};

export type VacationRequestCreateT = {
  userId: UserIdT;
  fromDate: string;
  toDate: string;
  reason: string;
  idAbsence: number;
};

export type VacationsStateT = {
  allVacations: VacationsDataT[];
  userVacations: VacationsDataT[];
  userVacationRequests: VacationRequestT[];
  categories: VacationsCategoryT[];
  isLoading: boolean;
  isLoadingUserVacations: boolean;
  isLoadingUserVacationRequests: boolean;
};

export enum VacationsActionTypes {
  FETCH_ALL_CURRENT_VACATIONS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS",
  FETCH_ALL_CURRENT_VACATIONS_SUCCESS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_SUCCESS",
  FETCH_ALL_CURRENT_VACATIONS_ERROR = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_ERROR",
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
}
