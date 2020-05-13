import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectedWorkerStateT,
  ISelectedWorker,
  ISelectedWorkerVacationCreateNew,
} from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import VacationsForm from "../components/vacations/VacationsForm";
import Card from "../components/card/Card";
import CustomTable, {
  CustomTableDataT,
  CustomTableHeaderT,
} from "../components/CustomTable";
import { Row, Col } from "react-bootstrap";
import { UserT } from "../state/ducks/user/types";
import VacationsLeftDays from "../components/vacations/VacationsLeftDays";
import { createSelectedWorkerVacationsAsync } from "../state/ducks/selected-worker/actions";
import { getVacationsCategoriesAsync } from "../state/ducks/vacations/actions";
import {
  VacationsCategoryT,
  VacationsFormDataT,
} from "../state/ducks/vacations/types";
import {
  createCurrentVacationsTableData,
  createHistoryVacationsTableData,
  createNewVacationObject,
  getPotentialsSubs,
} from "../state/ducks/vacations/operations";

const WorkerVacations: React.FC = () => {
  const dispatch = useDispatch();
  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );
  const vacationsCategories: VacationsCategoryT[] = useSelector(
    ({ vacations }: IApplicationState) => vacations.categories
  );
  const selectedWorker: SelectedWorkerStateT = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker
  );

  useEffect(() => {
    dispatch(getVacationsCategoriesAsync.request());
  }, []);

  const potentialSubs: ISelectedWorker[] | undefined = useMemo(
    () => getPotentialsSubs(users, selectedWorker.user.data),
    [users, selectedWorker]
  );

  const createWorkerVacationRequest = useCallback(
    (data: VacationsFormDataT) => {
      if (selectedWorker.user.data?.idUser) {
        const newVacation: ISelectedWorkerVacationCreateNew = createNewVacationObject(
          selectedWorker.user.data?.idUser,
          data
        );
        dispatch(createSelectedWorkerVacationsAsync.request(newVacation));
      }
    },
    [dispatch]
  );

  const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

  const currentTableData: CustomTableDataT | undefined = useMemo(
    () => createCurrentVacationsTableData(selectedWorker.vacation.data),
    [selectedWorker.vacation.data]
  );

  const historyTableData: CustomTableDataT | undefined = useMemo(
    () => createHistoryVacationsTableData(selectedWorker.vacation.data),
    [selectedWorker.vacation.data]
  );

  return (
    <div className="content">
      <Row>
        <Col xl={6} className="d-flex">
          <Card
            title="Pozostałe dni urlopu"
            content={
              <VacationsLeftDays leftDays={selectedWorker.vacation.leftDays} />
            }
          />
        </Col>
        <Col xl={6}>
          <Card
            title="Przydziel urlop"
            content={
              <VacationsForm
                leftVacationsDays={selectedWorker.vacation.leftDays}
                potentialSubs={potentialSubs}
                createNewVacation={createWorkerVacationRequest}
                categories={vacationsCategories}
                isLoading={selectedWorker.vacation.isLoadingCreateData}
              />
            }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            title="Obecne i przyszłe urlopy"
            content={
              <CustomTable header={tableHeader} data={currentTableData} />
            }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            title="Historia urlopów"
            content={
              <CustomTable header={tableHeader} data={historyTableData} />
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default WorkerVacations;
