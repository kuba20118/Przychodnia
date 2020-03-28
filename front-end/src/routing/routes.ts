import Dashboard from "../views/Dashboard";
import AdminProfile from "../views/AdminProfile";
import Vacations from "../views/Vacations";
import { RouteProps } from "react-router-dom";
import Registration from "../views/Registration";
import Worker from "../views/Worker";
import WorkerVacations from "../containers/WorkerVacations";
import WorkerWorkSchedule from "../containers/WorkerWorkSchedule";
import WorkerEdit from "../containers/WorkerEdit";

export interface IRouteComponentProps extends RouteProps {
  childrenRoutes?: RoutesType[];
}

export type RoutesType = {
  path: string;
  name: string;
  component: React.FC<IRouteComponentProps>;
  layout: string;
  children?: RoutesType[];
};

const routes: RoutesType[] = [
  {
    path: "/panel-glowny",
    name: "Panel główny",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/profil",
    name: "Profil admina",
    component: AdminProfile,
    layout: "/admin"
  },
  {
    path: "/wykaz-urlopow",
    name: "Wykaz Urlopów",
    component: Vacations,
    layout: "/admin"
  },
  {
    path: "/pracownicy",
    name: "Pracownicy",
    component: Worker,
    layout: "/admin",
    children: [
      {
        path: "/pracownicy/urlop",
        name: "Urlop",
        component: WorkerVacations,
        layout: "/admin"
      },
      {
        path: "/pracownicy/grafik",
        name: "Grafik",
        component: WorkerWorkSchedule,
        layout: "/admin"
      },
      {
        path: "/pracownicy/edytuj",
        name: "Edytuj",
        component: WorkerEdit,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/rejestracja-pracownikow",
    name: "Rejestracja pracowników",
    component: Registration,
    layout: "/admin"
  }
];

export default routes;
