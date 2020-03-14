import React, { useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import {
  ProtectedRouteProps,
  ProtectedRoute
} from "./components/ProtectedRoute";
import {
  AuthenticationStateT,
  AuthenticationActionTypes
} from "./state/ducks/authentication/types";
import { IApplicationState } from "./state/ducks";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import { setRedirectPathOnAuthenticationAction } from "./state/ducks/authentication/actions";
import Login from "./views/Login";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const authentication: AuthenticationStateT = useSelector(
    ({ authentication }: IApplicationState) => authentication
  );
  const setRedirectPathOnAuthentication = useCallback(
    (path: string) => dispatch(setRedirectPathOnAuthenticationAction(path)),
    [dispatch]
  );

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!authentication.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication:
      authentication.redirectPathOnAuthentication || "/login",
    setRedirectPathOnAuthentication
  };

  return (
    <>
      <Switch>
        {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
        {/* <Redirect from="/" to="/admin/panel-glowny" /> */}
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/admin"
          component={AdminLayout}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
