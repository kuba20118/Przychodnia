export type RoleT = {
  idRole: number;
  name: string;
};

export type RoleStateT = {
  roles: RoleT[];
  isLoadingAdd: boolean;
};

export const AllRightsRoles = ["Admin", "Kierownik"];

export enum RoleActionTypes {
  FETCH_ROLES = "@@role/FETCH_ROLES",
  FETCH_ROLES_SUCCESS = "@@role/FETCH_ROLES_SUCCESS",
  FETCH_ROLES_ERROR = "@@role/FETCH_ROLES_ERROR",
  GET_ROLE = "@@role/GET_ROLE",
  GET_ROLE_SUCCESS = "@@role/GET_ROLE_SUCCESS",
  GET_ROLE_ERROR = "@@role/GET_ROLE_ERROR",
  ADD_ROLE = "@@role/ADD_ROLE",
  ADD_ROLE_SUCCESS = "@@role/ADD_ROLE_SUCCESS",
  ADD_ROLE_ERROR = "@@role/ADD_ROLE_ERROR",
}
