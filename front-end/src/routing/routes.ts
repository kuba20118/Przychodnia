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
import VacationsUserView from "../views/user/Vacations";
import WorkScheduleUserView from "../views/user/WorkSchedule";
import DictionaryData from "../views/admin/DictionaryData";

export interface IRouteComponentProps extends RouteProps {
  childrenRoutes?: RoutesType[];
}

export type RoutesType = {
  path: string;
  name: string;
  description?: string;
  component: React.FC<IRouteComponentProps>;
  layout: string;
  children?: RoutesType[];
};

export const adminRoutes: RoutesType = {
  path: "/admin",
  name: "Admin",
  component: AdminLayout,
  layout: "",
  children: [
    {
      path: "/panel-glowny",
      name: "Panel główny",
      description:
        "Tutaj możesz zobaczyć ile osób liczy firma oraz<br/>ich podział na stanowiska. Widoczne są również <br/>różnego rodzaju statystyki.",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/wykaz-urlopow",
      name: "Wykaz Urlopów",
      description:
        "W tabelkach rozpisane są kolejno urlopy, które obecnie trwają<br/> oraz poniżej te które wystąpiły w przeszłości.",
      component: Vacations,
      layout: "/admin",
    },
    {
      path: "/zastepstwa",
      name: "Wykaz Zastępstw",
      description:
        "W tabelkach rozpisane są kolejno zastępstwa, które obecnie trwają<br/> oraz poniżej te które wystąpiły w przeszłości.",
      component: Substitutions,
      layout: "/admin",
    },
    {
      path: "/pracownicy",
      name: "Pracownicy",
      description:
        "Wyszukaj pracownika, by móc skorzystać z dodatkowych zakładek:<br/> Urlop - zarządzanie urlopami pracowników<br/>Grafik - zarządzanie grafikiem pracownika<br/>Edytuj - edycja danych pracownika",
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
      description:
        "Stwórz nowego użytkownika przypisując mu odpowiednie dane oraz rolę.",
      component: Registration,
      layout: "/admin",
    },
    {
      path: "/edycja-danych",
      name: "Edycja danych",
      description: "Edytuj dane, które są zapisane w systemie.",
      component: DictionaryData,
      layout: "/admin",
    },
  ],
};

export const userRoutes: RoutesType = {
  path: "/uzytkownik",
  name: "Użytkownik",
  component: UserLayout,
  layout: "",
  children: [
    {
      path: "/grafik",
      name: "Grafik",
      description:
        "Tutaj możesz zobaczyć swój grafik pracy na kolejne oraz poprzednie dni.",
      component: WorkScheduleUserView,
      layout: "/uzytkownik",
    },
    {
      path: "/urlop",
      name: "Urlop",
      description:
        "Tutaj możesz zobaczyć swoje teraźniejsze urlopy oraz ich historię. <br/>Dodatkowo istnieje możliwość zgłoszenia prośby o urlop, która<br/>będzie widoczna u Twojego przełożonego.",
      component: VacationsUserView,
      layout: "/uzytkownik",
    },
  ],
};
