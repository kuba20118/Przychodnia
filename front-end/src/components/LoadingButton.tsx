import React from "react";
import { Button, Spinner, SpinnerProps } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap";

export type LoadingButtonPropsT = {
  defaultText: string;
  defaultType: ButtonProps["type"];
  isLoading: boolean;
  variant: ButtonProps["variant"] & SpinnerProps["variant"];
};

const LoadingButton: React.FC<LoadingButtonPropsT> = ({
  defaultText,
  defaultType,
  isLoading = false,
  variant = "primary"
}) => {
  return (
    <Button
      variant={variant}
      type={defaultType}
      disabled={isLoading}
      className="btn-animate"
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Ładowanie...
        </>
      ) : (
        <>{defaultText}</>
      )}
    </Button>
  );
};

export default LoadingButton;
