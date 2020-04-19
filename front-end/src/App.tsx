import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProtectedRouteProps, ProtectedRoute } from "./routing/ProtectedRoute";
import { AuthStateT } from "./state/ducks/auth/types";
import { IApplicationState } from "./state/ducks";
import { useSelector, shallowEqual } from "react-redux";
import Login from "./views/Login";
import { adminRoutes, userRoutes, RoutesType } from "./routing/routes";
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

  const getRoutes = (routes: RoutesType) => (
    <>
      <ProtectedRoute
        {...defaultProtectedRouteProps}
        path={routes.path}
        component={() => <routes.component childrenRoutes={routes.children} />}
      />
      <Route
        exact
        path={["/login", "/"]}
        render={(props) => {
          if (authentication.isAuthenticated) {
            return <Redirect to={routes.path + routes.children![0].path} />;
          }
          return <Login />;
        }}
      />
    </>
  );

  return (
    <>
      <Switch>
        {isAuthorized(AllRightsRoles, currentUser?.role!)
          ? getRoutes(adminRoutes)
          : getRoutes(userRoutes)}
      </Switch>
    </>
  );
};

export default App;
