import React, { useCallback } from "react";
import { Switch, Route } from "react-router";
import { IRouteComponentProps } from "../../routing/routes";
import Card from "../../components/card/Card";
import UsersSearch from "../../components/UsersSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedWorker,
  getSelectedWorkerVacationsAsync,
  getSelectedWorkerWorkScheduleAsync,
  getSelectedWorkerVacationsLeftDaysAsync,
} from "../../state/ducks/selected-worker/actions";
import { ISelectedWorker } from "../../state/ducks/selected-worker/types";
import { IApplicationState } from "../../state/ducks";
import UserCard from "../../components/card/CardUser";
import { UserT } from "../../state/ducks/user/types";
import { Row, Col } from "react-bootstrap";
import AdminVacationsRequestForm from "../../components/vacations/AdminVacationsRequestForm";
import { ISelectedWorkerVacationRequest } from "../../state/ducks/selected-worker/types";

const fakeRequests: ISelectedWorkerVacationRequest[] = [
  {
    idRequest: 1,
    fromDate: "from data",
    toDate: "to Data",
    reason: "Mam mnie bije",
    idAbsence: 4,
  },
  {
    idRequest: 2,
    fromDate: "from data",
    toDate: "to Data",
    reason: "Nie mma sily ;(",
    idAbsence: 1,
  },
];

const Worker: React.FC<IRouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const worker: ISelectedWorker | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker.user.data
  );

  const searchWorker = useCallback(
    (worker: ISelectedWorker) => {
      dispatch(setSelectedWorker(worker));
      dispatch(getSelectedWorkerVacationsAsync.request(worker.idUser));
      dispatch(getSelectedWorkerWorkScheduleAsync.request(worker.idUser));
      dispatch(getSelectedWorkerVacationsLeftDaysAsync.request(worker.idUser));
    },
    [dispatch]
  );

  const submitVacationRequest = (answer: boolean) => {
    console.log("Prosba o urlop", answer);
  };

  return (
    <div className="content">
      <Card
        title={worker ? "" : "Wybierz pracownika"}
        content={<UsersSearch onSearch={searchWorker} users={users} />}
      />
      {worker ? (
        <Row className="d-flex">
          <Col md={6}>
            <UserCard user={worker} />
          </Col>
          <Col md={6}>
            <Card
              title="Prośby o urlop"
              content={
                <AdminVacationsRequestForm
                  requests={fakeRequests}
                  submitRequest={submitVacationRequest}
                />
              }
            />
          </Col>
        </Row>
      ) : (
        ""
      )}

      <Switch>
        {props.childrenRoutes!.map((item, key) => (
          <Route
            path={item.layout + item.path}
            render={(props) =>
              worker && <item.component {...props} {...worker} />
            }
            key={key}
          />
        ))}
      </Switch>
    </div>
  );
};

export default Worker;
