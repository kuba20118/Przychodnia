import Dashboard from "../views/Dashboard";
import UserProfile from "../views/UserProfile";
import Holidays from "../views/Holidays";
import { RouteProps } from "react-router-dom";
import WorkHours from "../views/WorkHours";

export type RoutesType = {
  path: string;
  name: string;
  component: React.FC<RouteProps>;
  layout: string;
};

const routes: RoutesType[] = [
  {
    path: "/panel-glowny",
    name: "Panel główny",
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
    path: "/urlopy",
    name: "Urlopy",
    component: Holidays,
    layout: "/admin"
  },
  {
    path: "/zwolnienia",
    name: "Zwolnienia",
    component: Holidays,
    layout: "/admin"
  },
  {
    path: "/godziny-pracy",
    name: "Godziny pracy",
    component: WorkHours,
    layout: "/admin"
  }
];

export default routes;
