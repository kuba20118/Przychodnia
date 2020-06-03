export type SubstitutionT = {
  idUser: string;
  firstName: string;
  lastName: string;
  fromDate: string;
  toDate: string;
  absenceType: string;
};

export type SubstitutionStateT = {
  subs: SubstitutionT[];
  pastSubs: SubstitutionT[];
};

export enum SubstitutionActionTypes {
  GET_ALL_SUBSTITUTIONS = "@@substitution/GET_ALL_SUBSTITUTIONS",
  GET_ALL_SUBSTITUTIONS_SUCCESS = "@@substitution/GET_ALL_SUBSTITUTIONS_SUCCESS",
  GET_ALL_SUBSTITUTIONS_ERROR = "@@substitution/GET_ALL_SUBSTITUTIONS_ERROR",

  GET_ALL_PAST_SUBSTITUTIONS = "@@substitution/GET_ALL_PAST_SUBSTITUTIONS",
  GET_ALL_PAST_SUBSTITUTIONS_SUCCESS = "@@substitution/GET_ALL_PAST_SUBSTITUTIONS_SUCCESS",
  GET_ALL_PAST_SUBSTITUTIONS_ERROR = "@@substitution/GET_ALL_PAST_SUBSTITUTIONS_ERROR",
}
