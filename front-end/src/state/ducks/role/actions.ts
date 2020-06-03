import { createAsyncAction } from "typesafe-actions";
import { RoleActionTypes, RoleT } from "./types";

export const fetchRoleAsync = createAsyncAction(
  RoleActionTypes.FETCH_ROLES,
  RoleActionTypes.FETCH_ROLES_SUCCESS,
  RoleActionTypes.FETCH_ROLES_ERROR
)<undefined, RoleT[], string>();

export const getRoleAsync = createAsyncAction(
  RoleActionTypes.GET_ROLE,
  RoleActionTypes.GET_ROLE_SUCCESS,
  RoleActionTypes.GET_ROLE_ERROR
)<number, undefined, string>();

export const addRoleAsync = createAsyncAction(
  RoleActionTypes.ADD_ROLE,
  RoleActionTypes.ADD_ROLE_SUCCESS,
  RoleActionTypes.ADD_ROLE_ERROR
)<string, RoleT, string>();
