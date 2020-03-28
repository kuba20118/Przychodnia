export type VacationsDataT = {
  userId: string;
  fromDate: string;
  toDate: string;
  absenceType: string;
};

export type VacationsStateT = {
  allVacations: VacationsDataT[];
  types: string[];
  isLoading: boolean;
};

export enum VacationsActionTypes {
  FETCH_ALL_CURRENT_VACATIONS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS",
  FETCH_ALL_CURRENT_VACATIONS_SUCCESS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_SUCCESS",
  FETCH_ALL_CURRENT_VACATIONS_ERROR = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_ERROR",
  GET_VACATIONS_TYPES = "@@vacations/GET_VACATIONS_TYPES",
  GET_VACATIONS_TYPES_SUCCESS = "@@vacations/GET_VACATIONS_TYPES_SUCCESS",
  GET_VACATIONS_TYPES_ERROR = "@@vacations/GET_VACATIONS_TYPES_ERROR"
}
