import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserVacationsAsync,
  createUserVacationRequestAsync,
} from "../../state/ducks/vacations/actions";
import { createCurrentUserTableData } from "../../state/ducks/vacations/operations";
import {
  VacationsDataT,
  VacationRequestT,
} from "../../state/ducks/vacations/types";
import CustomTable, {
  CustomTableHeaderT,
  CustomTableDataT,
} from "../../components/CustomTable";
import { IApplicationState } from "../../state/ducks";
import { UserT, UserIdT } from "../../state/ducks/user/types";
import Card from "../../components/card/Card";

const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

const UserVacations: React.FC = () => {
  const dispatch = useDispatch();

  const getUserVacations = useCallback(
    (userId: UserIdT) => dispatch(getUserVacationsAsync.request(userId)),
    [dispatch]
  );

  const currentUser: UserT | undefined = useSelector(
    ({ user }: IApplicationState) => user.currentUser
  );

  const userVacations: VacationsDataT[] | undefined = useSelector(
    ({ vacations }: IApplicationState) => vacations.userVacations
  );

  useEffect(() => {
    if (currentUser) getUserVacations(currentUser.idUser);
  }, [currentUser]);

  const createUserVacationRequest = useCallback(
    (vacationRequest: VacationRequestT) =>
      dispatch(createUserVacationRequestAsync.request(vacationRequest)),
    [dispatch]
  );

  const tableCurrentData:
    | CustomTableDataT
    | undefined = createCurrentUserTableData(userVacations);

  return (
    <div className="content">
      <Card
        title="Prośba o urlop"
        // subtitle={`Prośba zostanie przesłana do twojego przełożonego.`}
        content={
          <div className="content">
            <p>Tutaj będzie można złożyć prośbę.</p>
          </div>
        }
      />
      <Card
        title="Obecne urlopy"
        subtitle={``}
        content={
          <div className="content">
            {tableCurrentData && tableCurrentData!.length > 0 ? (
              <CustomTable header={tableHeader} data={tableCurrentData} />
            ) : (
              <p>Obecnie nie masz żadnych urlopów.</p>
            )}
          </div>
        }
      />
      <Card
        title="Historia urlopów"
        subtitle={`Dane dotyczą wszystkich nieobecności.`}
        content={
          <div className="content">
            <p>Historia jest pusta.</p>
          </div>
        }
      />
    </div>
  );
};

export default UserVacations;
