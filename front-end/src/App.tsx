import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProtectedRouteProps, ProtectedRoute } from "./routing/ProtectedRoute";
import { AuthStateT } from "./state/ducks/auth/types";
import { IApplicationState } from "./state/ducks";
import { useSelector, shallowEqual } from "react-redux";
import Login from "./views/Login";
import { adminRoutes, userRoutes } from "./routing/routes";
import { AllRightsRoles } from "./state/ducks/role/types";

const App: React.FC = () => {
  const authentication: AuthStateT = useSelector(
    ({ authentication }: IApplicationState) => authentication,
    shallowEqual
  );
  const currentUser = useSelector(
    (state: IApplicationState) => state.user.currentUser,
    shallowEqual
  );

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!authentication.isAuthenticated,
    authenticationPath: "/login",
  };

  const isAuthorized = (roles: string[], role: string) => {
    return roles && roles.indexOf(role) >= 0;
  };

  const getRoutes = () => {
    return isAuthorized(AllRightsRoles, currentUser?.role!) ? (
      <>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path={adminRoutes.path}
          component={() => (
            <adminRoutes.component childrenRoutes={adminRoutes.children} />
          )}
        />
        <Route
          path={["/login", "/"]}
          render={(props) => {
            if (authentication.isAuthenticated) {
              return (
                <Redirect
                  to={adminRoutes.path + adminRoutes.children![0].path}
                />
              );
            }
            return <Login />;
          }}
        />
      </>
    ) : (
      <>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path={userRoutes.path}
          component={() => (
            <adminRoutes.component childrenRoutes={userRoutes.children} />
          )}
        />
        <Route
          path={["/login", "/"]}
          render={(props) => {
            if (authentication.isAuthenticated) {
              return (
                <Redirect to={userRoutes.path + userRoutes.children![0].path} />
              );
            }
            return <Login />;
          }}
        />
      </>
    );
  };

  return (
    <>
      <Switch>{getRoutes()}</Switch>
    </>
  );
};

export default App;
