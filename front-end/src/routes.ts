import Dashboard from "./views/Dashboard";
import UserProfile from "./views/UserProfile";
import Holidays from "./views/Holidays";
import { RouteProps } from "react-router-dom";

export type RoutesType = {
  path: string;
  name: string;
  component: React.FC<RouteProps>;
  layout: string;
};

const Routes: RoutesType[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/uzytkownik",
    name: "Profil użytkownika",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/urlop",
    name: "Urlop",
    component: Holidays,
    layout: "/admin"
  }
];

export default Routes;
