import { AlertActionsTypes, AlertT, AlertStateT } from "./types";
import { TypeConstant, Action, PayloadAction } from "typesafe-actions";

export const initialAlertState: AlertStateT = {
  currentAlert: undefined,
};

export const alertReducer = (
  state: AlertStateT = initialAlertState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, AlertT>
): AlertStateT => {
  switch (action.type) {
    case AlertActionsTypes.ACTIVATE_ALERT: {
      return { ...state, currentAlert: action.payload };
    }
    case AlertActionsTypes.CLOSE_ALERT: {
      return { ...initialAlertState };
    }

    default:
      return state;
  }
};
