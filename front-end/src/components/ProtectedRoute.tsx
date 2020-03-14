import React from "react";
import { RouteProps, Redirect, Route, useLocation } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  // isAllowed: boolean;
  authenticationPath: string;
  redirectPathOnAuthentication: string;
  setRedirectPathOnAuthentication: (path: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const currentLocation = useLocation();
  let redirectPath = props.redirectPathOnAuthentication;

  if (!props.isAuthenticated) {
    props.setRedirectPathOnAuthentication(currentLocation.pathname);
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} />;
  } else {
    return <Route {...props} />;
  }
};
