import React from "react";
import { useSelector } from "react-redux";
import {
  SelectedWorkerStateT,
  ISelectedWorker,
  LeftVacationsDaysT
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
import { UserT } from "../state/ducks/user/types";
import VacationsLeftDays from "../components/VacationsLeftDays";

const WorkerVacations: React.FC = () => {
  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const selectedWorker: SelectedWorkerStateT | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker
  );

  const potentialSubs: ISelectedWorker[] | undefined =
    users &&
    users.filter((user) => user.idUser !== selectedWorker.worker?.idUser);

  const assignHolidays = (data: VacationsFormDataT) => {
    console.log("DATA IN PARENT", data);
  };

  const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

  const tableData: CustomTableDataT | undefined =
    selectedWorker.vacations &&
    selectedWorker.vacations!.map((item, index) => {
      const data = [
        index.toString(),
        format(parseISO(item.fromDate), "dd-MM-yyyy"),
        format(parseISO(item.toDate), "dd-MM-yyyy"),
        item.absenceType
      ];
      return data;
    });

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
      <Row>
        <Col>
          <Card
            title="Historia urlopów"
            content={<CustomTable header={tableHeader} data={tableData} />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default WorkerVacations;
