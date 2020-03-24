import Dashboard from "../views/Dashboard";
import UserProfile from "../views/UserProfile";
import Vacations from "../views/Vacations";
import { RouteProps } from "react-router-dom";
import WorkSchedule from "../views/WorkSchedule";
import Registration from "../views/Registration";

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
    component: Vacations,
    layout: "/admin"
  },
  {
    path: "/godziny-pracy",
    name: "Godziny pracy",
    component: WorkSchedule,
    layout: "/admin"
  },
  {
    path: "/rejestracja-pracownikow",
    name: "Rejestracja pracowników",
    component: Registration,
    layout: "/admin"
  }
];

export default routes;
