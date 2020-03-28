import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVacationsAsync } from "../state/ducks/vacations/actions";
import { VacationsDataT } from "../state/ducks/vacations/types";
import CustomTable, {
  CustomTableHeaderT,
  CustomTableDataT
} from "../components/CustomTable";
import { IApplicationState } from "../state/ducks";
import { UserT } from "../state/ducks/user/types";
import Card from "../components/Card";

const Vacations: React.FC = () => {
  const dispatch = useDispatch();

  const fetchAllVacations = useCallback(
    () => dispatch(fetchAllVacationsAsync.request()),
    [dispatch]
  );

  useEffect(() => {
    fetchAllVacations();
  }, []);

  const vacations: VacationsDataT[] | undefined = useSelector(
    ({ vacations }: IApplicationState) => vacations.allVacations
  );

  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const tableHeader: CustomTableHeaderT = [
    "#",
    "Imię",
    "Nazwisko",
    "Od",
    "Do",
    "Typ"
  ];

  const tableData: CustomTableDataT | undefined =
    vacations &&
    users &&
    vacations!.map((item, index) => {
      const user: UserT | undefined = users.find(
        (u) => u.idUser === item.userId
      );

      const data = [
        index.toString(),
        user!.firstName || "",
        user!.lastName || "",
        item.fromDate.toString(),
        item.toDate.toString(),
        item.absenceType
      ];
      return data;
    });

  return (
    <div className="content">
      <Card
        title="Obecne urlopy"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            <CustomTable header={tableHeader} data={tableData} />
          </div>
        }
      />
    </div>
  );
};

export default Vacations;
