import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectedWorkerStateT,
  ISelectedWorker,
  LeftVacationsDaysT,
  ISelectedWorkerVacations
} from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import VacationsForm, { VacationsFormDataT } from "../components/VacationsForm";
import Card from "../components/Card";
import CustomTable, {
  CustomTableDataT,
  CustomTableHeaderT
} from "../components/CustomTable";
import { format, parseISO } from "date-fns/esm";
import { Row, Col } from "react-bootstrap";
import { UserT, UserIdT } from "../state/ducks/user/types";
import VacationsLeftDays from "../components/VacationsLeftDays";
import { createSelectedWorkerVacationsAsync } from "../state/ducks/selected-worker/actions";
import { isFuture, isPast } from "date-fns";

const WorkerVacations: React.FC = () => {
  const dispatch = useDispatch();
  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const selectedWorker: SelectedWorkerStateT | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker
  );

  const potentialSubs: ISelectedWorker[] | undefined =
    users &&
    users.filter((user) => user.idUser !== selectedWorker.worker?.idUser);

  const createWorkerVacationRequest = useCallback(
    (newVacation: ISelectedWorkerVacations) =>
      dispatch(createSelectedWorkerVacationsAsync.request(newVacation)),
    [dispatch]
  );

  const assignHolidays = (data: VacationsFormDataT) => {
    if (selectedWorker.worker) {
      const newVacation: ISelectedWorkerVacations = {
        userId: selectedWorker.worker?.idUser,
        fromDate: data.startDate,
        toDate: data.endDate,
        absenceType: data.category
      };
      createWorkerVacationRequest(newVacation);
    }
  };

  const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

  const createTableDataItem = (
    dataItem: ISelectedWorkerVacations,
    index: number
  ): string[] => [
    index.toString(),
    format(parseISO(dataItem.fromDate), "dd-MM-yyyy"),
    format(parseISO(dataItem.toDate), "dd-MM-yyyy"),
    dataItem.absenceType
  ];

  const currentTableData: CustomTableDataT | undefined =
    selectedWorker.vacations &&
    selectedWorker
      .vacations!.filter((item) => isFuture(new Date(item.toDate)))
      .map((item, index) => createTableDataItem(item, index));

  const historyTableData: CustomTableDataT | undefined =
    selectedWorker.vacations &&
    selectedWorker
      .vacations!.filter((item) => isPast(new Date(item.toDate)))
      .map((item, index) => createTableDataItem(item, index));

  return (
    <div className="content">
      <Row>
        <Col xl={6} className="d-flex">
          <Card
            title="Pozostałe dni urlopu"
            content={
              <VacationsLeftDays leftDays={selectedWorker.vacationsLeftDays} />
            }
          />
        </Col>
        <Col xl={6}>
          <Card
            title="Przydziel urlop"
            content={
              <VacationsForm
                leftDays={14}
                potentialSubs={potentialSubs}
                onSubmit={assignHolidays}
              />
            }
          />
        </Col>
      </Row>
      {currentTableData && (
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
      )}
      {historyTableData && (
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
      )}
    </div>
  );
};

export default WorkerVacations;
