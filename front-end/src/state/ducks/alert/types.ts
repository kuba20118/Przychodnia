import { AlertProps } from "react-bootstrap";

export type AlertT = {
  variant?: AlertProps["variant"];
  heading?: string;
  body?: string;
  showTime?: number;
};

export type AlertStateT = {
  currentAlert?: AlertT;
};

export enum AlertActionsTypes {
  ACTIVATE_ALERT = "@@alert/ACTIVATE_ALERT",
  CLOSE_ALERT = "@@alert/CLOSE_ALERT",
}
