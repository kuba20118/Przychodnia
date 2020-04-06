import { AlertT, AlertActionsTypes } from "./types";
import { action } from "typesafe-actions";

export const activateAlert = (alert: AlertT) =>
  action(AlertActionsTypes.ACTIVATE_ALERT, alert);

export const closeAlert = () => action(AlertActionsTypes.CLOSE_ALERT);
