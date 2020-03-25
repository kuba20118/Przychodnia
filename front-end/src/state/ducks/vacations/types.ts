export type VacationsDataT = {
  userId: string;
  fromDate: Date;
  toDate: Date;
  absenceType: string;
};

export type VacationsStateT = {
  allVacations: VacationsDataT[];
  userVacations: VacationsDataT[];
  loaded: boolean;
};

export enum VacationsActionTypes {
  CREATE_VACATIONS = "@@vacations/CREATE_VACATIONS",
  CREATE_VACATIONS_SUCCESS = "@@vacations/CREATE_VACATIONS_SUCCESS",
  CREATE_VACATIONS_ERROR = "@@vacations/CREATE_VACATIONS_ERROR",
  FETCH_ALL_VACATIONS = "@@vacations/FETCH_ALL_VACATIONS",
  FETCH_ALL_VACATIONS_SUCCESS = "@@vacations/FETCH_ALL_VACATIONS_SUCCESS",
  FETCH_ALL_VACATIONS_ERROR = "@@vacations/FETCH_ALL_VACATIONS_ERROR",
  GET_USER_VACATIONS = "@@vacations/GET_USER_VACATIONS",
  GET_USER_VACATIONS_SUCCESS = "@@vacations/GET_USER_VACATIONS_SUCCESS",
  GET_USER_VACATIONS_ERROR = "@@vacations/GET_USER_VACATIONS_ERROR"
}
