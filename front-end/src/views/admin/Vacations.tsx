import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVacationsAsync,
  fetchAllPastVacationsAsync,
  getAllUsersLeftVacationsDaysAsync,
} from "../../state/ducks/vacations/actions";
import {
  VacationsDataT,
  UserLeftVacationDays,
  LeftVacationsDaysT,
} from "../../state/ducks/vacations/types";
import CustomTable, {
  CustomTableHeaderT,
  CustomTableDataT,
} from "../../components/CustomTable";
import { IApplicationState } from "../../state/ducks";
import { UserT } from "../../state/ducks/user/types";
import Card from "../../components/card/Card";
import { format } from "date-fns";

const tableHeader: CustomTableHeaderT = [
  "#",
  "Imię",
  "Nazwisko",
  "Od",
  "Do",
  "Typ",
];

const createTableData = (
  users: UserT[],
  vacations: VacationsDataT[]
): CustomTableDataT =>
  vacations.map((item, index) => {
    const user: UserT | undefined = users.find((u) => {
      return u.idUser == item.idUser;
    });

    if (user) {
      const data = [
        (index + 1).toString(),
        user!.firstName || "",
        user!.lastName || "",
        format(new Date(item.fromDate), "dd-MM-yyyy"),
        format(new Date(item.toDate), "dd-MM-yyyy"),
        item.absenceType,
      ];
      return data;
    }
    return [];
  });

const Vacations: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllVacationsAsync.request());
    dispatch(fetchAllPastVacationsAsync.request());
    dispatch(getAllUsersLeftVacationsDaysAsync.request());
  }, []);

  const vacations: VacationsDataT[] | undefined = useSelector(
    ({ vacations }: IApplicationState) => vacations.allVacations
  );

  const pastVacations: VacationsDataT[] | undefined = useSelector(
    ({ vacations }: IApplicationState) => vacations.allPastVacations
  );

  const allUsersLeftVacationDays: UserLeftVacationDays[] = useSelector(
    ({ vacations }: IApplicationState) => vacations.allUsersLeftVacationDays
  );

  const getMaxLeftDays = (
    allUsersLeftVacationDays: UserLeftVacationDays[]
  ): string[] => {
    if (allUsersLeftVacationDays.length < 1) return [];
    let max = 0;
    let i = 0;

    allUsersLeftVacationDays.forEach((day, index) => {
      if (day.daysLeft.length > max) {
        i = index;
      }
    });

    return allUsersLeftVacationDays[i].daysLeft.map((day) => day.vacationType);
  };

  const leftDaysHeader = [
    "#",
    "Imię",
    "Nazwisko",
    ...getMaxLeftDays(allUsersLeftVacationDays),
  ];

  const createTableLeftDaysData = (
    allUsersLeftVacationDays: UserLeftVacationDays[]
  ): CustomTableDataT =>
    allUsersLeftVacationDays.map((item, index) => {
      const values = item.daysLeft.map((day) => day.leftDays.toString());
      const maxLeftDays = getMaxLeftDays(allUsersLeftVacationDays);
      const diff = maxLeftDays.length - values.length;

      if (diff !== 0) {
        for (let i = 0; i < diff; i++) {
          values.push("-");
        }
      }

      const data = [
        (index + 1).toString(),
        item.firstName || "",
        item.lastName || "",
        ...values,
      ];
      return data;
    });

  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  return (
    <div className="content">
      <Card
        title="Obecne urlopy"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            {users && vacations ? (
              <CustomTable
                header={tableHeader}
                data={createTableData(users, vacations)}
              />
            ) : (
              <p>Obecnie nie ma żadnych urlopów.</p>
            )}
          </div>
        }
      />
      <Card
        title="Historia urlopów"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            {users && vacations ? (
              <CustomTable
                header={tableHeader}
                data={createTableData(users, pastVacations)}
              />
            ) : (
              <p>Historia jest pusta.</p>
            )}
          </div>
        }
      />
      <Card
        title="Pozostałe dni urlopu"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            {allUsersLeftVacationDays ? (
              <CustomTable
                header={leftDaysHeader}
                data={createTableLeftDaysData(allUsersLeftVacationDays)}
              />
            ) : (
              <p>Ładowanie...</p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Vacations;
