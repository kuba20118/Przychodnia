import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import { ProtectedRouteProps, ProtectedRoute } from "./routing/ProtectedRoute";
import { AuthStateT } from "./state/ducks/auth/types";
import { IApplicationState } from "./state/ducks";
import { useSelector } from "react-redux";
import Login from "./views/Login";

const App: React.FC = () => {
  const authentication: AuthStateT = useSelector(
    ({ authentication }: IApplicationState) => authentication
  );

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!authentication.isAuthenticated,
    authenticationPath: "/login"
  };

  return (
    <>
      <Switch>
        {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} /> */}
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/admin"
          component={AdminLayout}
        />
        <Route
          path="/login"
          render={(props) =>
            authentication.isAuthenticated ? (
              <Redirect to="/admin/panel-glowny" />
            ) : (
              <Login />
            )
          }
        />
        <Redirect from="/" to="/login" />
      </Switch>
    </>
  );
};

export default App;
