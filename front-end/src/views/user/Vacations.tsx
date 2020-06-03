import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserVacationsAsync,
  createUserVacationRequestAsync,
  getVacationsCategoriesAsync,
  getUserLeftVacationsDaysAsync,
} from "../../state/ducks/vacations/actions";
import { createCurrentUserTableData } from "../../state/ducks/vacations/operations";
import {
  VacationsStateT,
  VacationRequestCreateT,
  VacationRequestCreateFormT,
} from "../../state/ducks/vacations/types";
import CustomTable, {
  CustomTableHeaderT,
  CustomTableDataT,
} from "../../components/CustomTable";
import { IApplicationState } from "../../state/ducks";
import { UserT, UserIdT } from "../../state/ducks/user/types";
import Card from "../../components/card/Card";
import UserVacationsRequestForm from "../../components/user/UserVacationsRequestForm";
import formatToString from "../../state/utils/date/formatToString";
import { Row, Col } from "react-bootstrap";
import VacationsLeftDays from "../../components/vacations/VacationsLeftDays";

const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

const UserVacations: React.FC = () => {
  const dispatch = useDispatch();

  const currentUser: UserT | undefined = useSelector(
    ({ user }: IApplicationState) => user.currentUser
  );

  const vacations: VacationsStateT = useSelector(
    ({ vacations }: IApplicationState) => vacations
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserVacationsAsync.request(currentUser.idUser));
      dispatch(getUserLeftVacationsDaysAsync.request(currentUser.idUser));
      dispatch(getVacationsCategoriesAsync.request());
    }
  }, [currentUser]);

  const handleCreateVacationsRequest = (data: VacationRequestCreateFormT) => {
    if (!currentUser) return;

    const createVacationsRequestData: VacationRequestCreateT = {
      userId: currentUser?.idUser,
      fromDate: formatToString(data.fromDate),
      toDate: formatToString(data.toDate),
      reason: data.reason,
      idAbsence: data.idAbsence,
    };

    dispatch(
      createUserVacationRequestAsync.request(createVacationsRequestData)
    );
  };

  const tableCurrentData:
    | CustomTableDataT
    | undefined = createCurrentUserTableData(vacations.userVacations);

  return (
    <div className="content">
      <Row>
        <Col md={3}>
          <Card
            title="Pozostałe dni urlopu"
            content={
              <VacationsLeftDays leftDays={vacations.userLeftVacationsDays} />
            }
          />
        </Col>
        <Col md={9}>
          <Card
            title="Prośba o urlop"
            content={
              <UserVacationsRequestForm
                leftVacationsDays={vacations.userLeftVacationsDays}
                submitRequest={handleCreateVacationsRequest}
                absenceCategories={vacations.categories}
                isLoading={vacations.isLoadingUserVacationRequests}
              />
            }
          />
        </Col>
      </Row>
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
            {tableCurrentData && tableCurrentData!.length > 0 ? (
              <CustomTable header={tableHeader} data={tableCurrentData} />
            ) : (
              <p>Obecnie nie masz żadnych urlopów.</p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default UserVacations;
