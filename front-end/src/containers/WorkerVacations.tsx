import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SelectedWorkerStateT,
  ISelectedWorker,
  ISelectedWorkerVacations,
  ISelectedWorkerVacationCreateNew,
} from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import VacationsForm, { VacationsFormDataT } from "../components/VacationsForm";
import Card from "../components/Card";
import CustomTable, {
  CustomTableDataT,
  CustomTableHeaderT,
} from "../components/CustomTable";
import { format, parseISO } from "date-fns/esm";
import { Row, Col } from "react-bootstrap";
import { UserT } from "../state/ducks/user/types";
import VacationsLeftDays from "../components/VacationsLeftDays";
import { createSelectedWorkerVacationsAsync } from "../state/ducks/selected-worker/actions";
import { isFuture, isPast } from "date-fns";
import { getVacationsCategoriesAsync } from "../state/ducks/vacations/actions";
import { VacationsCategoryT } from "../state/ducks/vacations/types";

const createTableDataItem = (
  dataItem: ISelectedWorkerVacations,
  index: number
): string[] => [
  index.toString(),
  format(parseISO(dataItem.fromDate), "dd-MM-yyyy"),
  format(parseISO(dataItem.toDate), "dd-MM-yyyy"),
  dataItem.absenceType,
];

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

  const getVacationsCategoriersRequest = useCallback(
    () => dispatch(getVacationsCategoriesAsync.request()),
    [dispatch]
  );

  useEffect(() => {
    getVacationsCategoriersRequest();
  }, []);

  const potentialSubs: ISelectedWorker[] | undefined =
    users &&
    users.filter(
      (user) =>
        user.idUser !== selectedWorker.user.data?.idUser &&
        user.role === selectedWorker.user.data?.role
    );

  const createWorkerVacationRequest = useCallback(
    (data: VacationsFormDataT) => {
      if (selectedWorker.user.data?.idUser) {
        const newVacation: ISelectedWorkerVacationCreateNew = {
          userId: selectedWorker.user.data?.idUser,
          fromDate: data.fromDate,
          toDate: data.toDate,
          absenceId: data.categoryId,
          substitutionId: data.substitutionId,
        };
        dispatch(createSelectedWorkerVacationsAsync.request(newVacation));
      }
    },
    [dispatch]
  );

  const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

  const currentTableData: CustomTableDataT | undefined = useMemo(
    () =>
      selectedWorker.vacation.data &&
      selectedWorker.vacation
        .data!.filter((item) => {
          return isFuture(new Date(item.toDate));
        })
        .map((item, index) => createTableDataItem(item, index)),
    [selectedWorker.vacation.data]
  );

  const historyTableData: CustomTableDataT | undefined = useMemo(
    () =>
      selectedWorker.vacation.data &&
      selectedWorker.vacation
        .data!.filter((item) => isPast(new Date(item.toDate)))
        .map((item, index) => createTableDataItem(item, index)),
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
