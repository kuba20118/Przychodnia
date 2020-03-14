import React from "react";
import Routes, { RoutesType } from "../routes";
import { Route, RouteProps } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Admin: React.FC<RouteProps> = () => {
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

  return (
    <div className="wrapper">
      <Sidebar routes={Routes} userRole="TODO" logoSrc="TODO" />
      <div className="main-panel"></div>
    </div>
  );
};

export default Admin;
