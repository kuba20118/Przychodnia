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

export type VacationsStateT = {
  allVacations: VacationsDataT[];
  categories: VacationsCategoryT[];
  isLoading: boolean;
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

export enum VacationsActionTypes {
  FETCH_ALL_CURRENT_VACATIONS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS",
  FETCH_ALL_CURRENT_VACATIONS_SUCCESS = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_SUCCESS",
  FETCH_ALL_CURRENT_VACATIONS_ERROR = "@@vacations/FETCH_ALL_CURRENT_VACATIONS_ERROR",
  GET_VACATIONS_CATEGORIES = "@@vacations/GET_VACATIONS_CATEGORIES",
  GET_VACATIONS_CATEGORIES_SUCCESS = "@@vacations/GET_VACATIONS_CATEGORIES_SUCCESS",
  GET_VACATIONS_CATEGORIES_ERROR = "@@vacations/GET_VACATIONS_CATEGORIES_ERROR",
}
