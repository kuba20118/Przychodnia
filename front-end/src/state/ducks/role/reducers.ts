import { RoleStateT, RoleT, RoleActionTypes } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialRoleState: RoleStateT = {
  roles: []
};

export const roleReducer = (
  state: RoleStateT = initialRoleState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, RoleT & RoleT[]>
): RoleStateT => {
  switch (action.type) {
    case RoleActionTypes.FETCH_ROLES: {
      return { ...state };
    }
    case RoleActionTypes.FETCH_ROLES_SUCCESS: {
      return { ...state, roles: action.payload };
    }
    case RoleActionTypes.FETCH_ROLES_ERROR: {
      return { ...state };
    }
    case RoleActionTypes.ADD_ROLE: {
      return { ...state };
    }
    case RoleActionTypes.ADD_ROLE_SUCCESS: {
      return { ...state, roles: [...state.roles, action.payload] };
    }
    case RoleActionTypes.ADD_ROLE_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};
