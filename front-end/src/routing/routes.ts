import Dashboard from "../views/Dashboard";
import UserProfile from "../views/UserProfile";
import WorkerLeave from "../views/WorkerLeave";
import { RouteProps } from "react-router-dom";
import WorkingSchedule from "../views/WorkingSchedule";

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
    component: WorkerLeave,
    layout: "/admin"
  },
  {
    path: "/zwolnienia",
    name: "Zwolnienia",
    component: WorkerLeave,
    layout: "/admin"
  },
  {
    path: "/godziny-pracy",
    name: "Godziny pracy",
    component: WorkingSchedule,
    layout: "/admin"
  }
];

export default routes;
