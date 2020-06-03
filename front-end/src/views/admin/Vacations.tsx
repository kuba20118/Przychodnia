import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVacationsAsync,
  fetchAllPastVacationsAsync,
} from "../../state/ducks/vacations/actions";
import { VacationsDataT } from "../../state/ducks/vacations/types";
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
  }, []);

  const vacations: VacationsDataT[] | undefined = useSelector(
    ({ vacations }: IApplicationState) => vacations.allVacations
  );

  const pastVacations: VacationsDataT[] | undefined = useSelector(
    ({ vacations }: IApplicationState) => vacations.allPastVacations
  );

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
    </div>
  );
};

export default Vacations;
