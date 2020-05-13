import React, { useEffect, useCallback } from "react";
import { Switch, useLocation, Route } from "react-router-dom";
import {
  fetchAllUsersAsync,
  logoutUserAsync,
} from "../state/ducks/user/actions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Sidebar from "../components/Sidebar";
import { IRouteComponentProps, RoutesType } from "../routing/routes";
import NavbarComponent from "../components/NavbarComponent";
import AlertComponent from "../components/AlertComponent";
import { IApplicationState } from "../state/ducks";
import { closeAlert } from "../state/ducks/alert/actions";

const Admin: React.FC<IRouteComponentProps> = ({ childrenRoutes }) => {
  const dispatch = useDispatch();
  const currentLocation = useLocation();

  useEffect(() => {
    dispatch(fetchAllUsersAsync.request());
  }, []);

  const getChildrenRoutes = (routes: RoutesType[]) => {
    return routes.map((item, key) => {
      return (
        <Route
          path={item.layout + item.path}
          render={(props) => {
            if (item.children) {
              return (
                <item.component {...props} childrenRoutes={item.children} />
              );
            }
            return <item.component {...props} />;
          }}
          key={key}
        />
      );
    });
  };

  const currentUser = useSelector(
    (state: IApplicationState) => state.user.currentUser,
    shallowEqual
  );

  const getPageNameText = (routes: RoutesType[]) => {
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
    logoutUserAsyncRequest: useCallback(() => {
      dispatch(logoutUserAsync.request(currentUser?.idUser!));
    }, [dispatch]),
  };

  const alert = useSelector(
    ({ alert }: IApplicationState) => alert.currentAlert
  );

  const removeAlert = useCallback(() => dispatch(closeAlert()), [dispatch]);

  return (
    <div className="wrapper">
      <Sidebar
        routes={childrenRoutes!}
        userRole={currentUser?.role!}
        logoSrc="TODO"
      />
      <div className="main-panel">
        <NavbarComponent
          pageName={getPageNameText(childrenRoutes!)}
          {...dispatchToNavbarProps}
        />
        <AlertComponent alert={alert} close={removeAlert} />
        <Switch>{getChildrenRoutes(childrenRoutes!)}</Switch>
      </div>
    </div>
  );
};

export default Admin;
