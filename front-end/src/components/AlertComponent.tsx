import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { AlertT } from "../state/ducks/alert/types";

type AlertComponentPropsT = {
  alert?: AlertT;
};

const AlertComponent: React.FC<AlertComponentPropsT> = ({ alert }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (alert) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [alert, setActive]);

  return (
    <>
      {active && (
        <Alert
          variant={alert?.variant}
          onClose={() => setActive(false)}
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
};

export default AlertComponent;
