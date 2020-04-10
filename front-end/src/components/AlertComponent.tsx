import React from "react";
import { Alert } from "react-bootstrap";
import { AlertT } from "../state/ducks/alert/types";

type AlertComponentPropsT = {
  alert?: AlertT;
  close: () => void;
};

const AlertComponent: React.FC<AlertComponentPropsT> = ({ alert, close }) => (
  <>
    {alert && (
      <Alert
        variant={alert?.variant}
        onClose={close}
        dismissible
        className="alert-custom alert-transition"
      >
        {alert?.heading ? (
          <Alert.Heading>{alert?.heading}</Alert.Heading>
        ) : null}
        <p style={{ margin: "0px" }}>{alert?.body}</p>
      </Alert>
    )}
  </>
);

export default AlertComponent;
