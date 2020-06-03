import { TypeConstant, Action, PayloadAction } from "typesafe-actions";
import {
  SubstitutionStateT,
  SubstitutionT,
  SubstitutionActionTypes,
} from "./types";

const initialSubsState: SubstitutionStateT = {
  subs: [],
  pastSubs: [],
};

export const substitutionReducer = (
  state: SubstitutionStateT = initialSubsState,
  action: Action<TypeConstant> &
    PayloadAction<TypeConstant, SubstitutionT[] & string>
): SubstitutionStateT => {
  switch (action.type) {
    case SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS: {
      return { ...state };
    }
    case SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS_SUCCESS: {
      return { ...state, subs: action.payload };
    }
    case SubstitutionActionTypes.GET_ALL_SUBSTITUTIONS_ERROR: {
      return { ...state };
    }
    case SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS: {
      return { ...state };
    }
    case SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS_SUCCESS: {
      return { ...state, pastSubs: action.payload };
    }
    case SubstitutionActionTypes.GET_ALL_PAST_SUBSTITUTIONS_ERROR: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
