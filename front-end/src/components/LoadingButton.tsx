import React from "react";
import { Button, ButtonProps, Spinner, SpinnerProps } from "react-bootstrap";

export type LoadingButtonPropsT = {
  defaultText: string;
  defaultType: ButtonProps["type"];
  isLoading: boolean;
  variant: ButtonProps["variant"] & SpinnerProps["variant"];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

const LoadingButton: React.FC<LoadingButtonPropsT> = ({
  defaultText,
  defaultType,
  isLoading = false,
  variant = "primary",
  onClick = () => {},
  disabled = true,
}) => {
  return (
    <Button
      variant={variant}
      type={defaultType}
      disabled={isLoading || disabled}
      className="btn-animate"
      onClick={onClick}
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
