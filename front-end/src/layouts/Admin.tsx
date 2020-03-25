import React, { useCallback, useEffect } from "react";
import routes, { RoutesType } from "../routing/routes";
import { Route, RouteProps, useLocation, Switch } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import {
  logoutUserAsync,
  fetchAllUsersAsync
} from "../state/ducks/user/actions";
import { useDispatch } from "react-redux";

const Admin: React.FC<RouteProps> = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync.request());
  }, [dispatch]);

  const getRoutes = (routes: RoutesType[]) => {
    return routes.map((item, key) => {
      if (item.layout === "/admin") {
        return (
          <Route
            path={item.layout + item.path}
            render={(props) => <item.component {...props} />}
            key={key}
          />
        );
      } else return null;
    });
  };

  const getPageNameText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (
        currentLocation.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
  };

  const dispatchToNavbarProps = {
    logoutUserAsyncRequest: useCallback(
      () => dispatch(logoutUserAsync.request()),
      [dispatch]
    )
  };

  return (
    <div className="wrapper">
      <Sidebar routes={routes} userRole="TODO ROLE" logoSrc="TODO" />
      <div className="main-panel">
        <AdminNavbar pageName={getPageNameText()} {...dispatchToNavbarProps} />
        <Switch>{getRoutes(routes)}</Switch>
      </div>
    </div>
  );
};

export default Admin;
