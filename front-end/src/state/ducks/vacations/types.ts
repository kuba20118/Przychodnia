export type VacationsDataT = {
  userId: string;
  fromDate: Date;
  toDate: Date;
};

export type VacationsStateT = {
  loaded: boolean;
};

export enum VacationsActionTypes {
  CREATE_VACATIONS = "@@vacations/CREATE_VACATIONS",
  CREATE_VACATIONS_SUCCESS = "@@vacations/CREATE_VACATIONS_SUCCESS",
  CREATE_VACATIONS_ERROR = "@@vacations/CREATE_VACATIONS_ERROR"
}
