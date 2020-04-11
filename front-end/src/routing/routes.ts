import AdminLayout from "../layouts/Admin";
import UserLayout from "../layouts/User";

import Dashboard from "../views/admin/Dashboard";
import Substitutions from "../views/admin/Substitutions";
import Vacations from "../views/admin/Vacations";
import { RouteProps } from "react-router-dom";
import Registration from "../views/admin/Registration";
import Worker from "../views/admin/Worker";
import WorkerVacations from "../containers/WorkerVacations";
import WorkerWorkSchedule from "../containers/WorkerWorkSchedule";
import WorkerEdit from "../containers/WorkerEdit";
import Help from "../views/Help";
import DashboardUserView from "../views/user/Dashboard";
import VacationsUserView from "../views/user/Vacations";
import WorkScheduleUserView from "../views/user/WorkSchedule";
import User from "../layouts/User";

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

export const adminRoutes: RoutesType = {
  path: "/admin",
  name: "Dup",
  component: AdminLayout,
  layout: "",
  children: [
    {
      path: "/panel-glowny",
      name: "Panel główny",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/wykaz-urlopow",
      name: "Wykaz Urlopów",
      component: Vacations,
      layout: "/admin",
    },
    {
      path: "/zastepstwa",
      name: "Wykaz Zastępstw",
      component: Substitutions,
      layout: "/admin",
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
          layout: "/admin",
        },
        {
          path: "/pracownicy/grafik",
          name: "Grafik",
          component: WorkerWorkSchedule,
          layout: "/admin",
        },
        {
          path: "/pracownicy/edytuj",
          name: "Edytuj",
          component: WorkerEdit,
          layout: "/admin",
        },
      ],
    },
    {
      path: "/rejestracja-pracownikow",
      name: "Rejestracja pracowników",
      component: Registration,
      layout: "/admin",
    },
    {
      path: "/pomoc",
      name: "Pomoc",
      component: Help,
      layout: "/admin",
    },
  ],
};

export const userRoutes: RoutesType = {
  path: "/uzytkownik",
  name: "Użytkownik",
  component: User,
  layout: "",
  children: [
    {
      path: "/panel-glowny",
      name: "Panel główny",
      component: DashboardUserView,
      layout: "/uzytkownik",
    },
    {
      path: "/urlop",
      name: "Urlop",
      component: VacationsUserView,
      layout: "/uzytkownik",
    },
    {
      path: "/grafik",
      name: "Grafik",
      component: WorkScheduleUserView,
      layout: "/uzytkownik",
    },
  ],
};
