import React, { useCallback, useMemo } from "react";
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
  createSelectedWorkerVacationsAsync,
  getSelectedWorkerVacationRequestsAsync,
} from "../../state/ducks/selected-worker/actions";
import {
  ISelectedWorker,
  SelectedWorkerStateT,
  ISelectedWorkerVacationCreateNew,
} from "../../state/ducks/selected-worker/types";
import { IApplicationState } from "../../state/ducks";
import {
  VacationRequestSubmitT,
  VacationRequestIdT,
} from "../../state/ducks/vacations/types";
import UserCard from "../../components/card/CardUser";
import { UserT } from "../../state/ducks/user/types";
import { Row, Col } from "react-bootstrap";
import AdminVacationsRequestForm from "../../components/vacations/AdminVacationsRequestForm";
import { ISelectedWorkerVacationRequest } from "../../state/ducks/selected-worker/types";
import { getPotentialsSubs } from "../../state/ducks/vacations/operations";

const fakeRequests: ISelectedWorkerVacationRequest[] = [
  {
    idRequest: 1,
    fromDate: "2020-05-29T07:00:00",
    toDate: "2020-05-30T23:10:00",
    reason: "Mam mnie bije",
    idAbsence: 4,
    absence: "Macierzyński",
  },
  {
    idRequest: 2,
    fromDate: "2020-05-29T07:00:00",
    toDate: "2020-05-30T12:00:00",
    reason: "Nie mam sily ;(",
    idAbsence: 1,
    absence: "L4",
  },
];

const Worker: React.FC<IRouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const worker: SelectedWorkerStateT = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker
  );

  const potentialSubs: ISelectedWorker[] | undefined = useMemo(
    () => getPotentialsSubs(users, worker.user.data),
    [users, worker]
  );

  const searchWorker = useCallback(
    (worker: ISelectedWorker) => {
      dispatch(setSelectedWorker(worker));
      dispatch(getSelectedWorkerVacationsAsync.request(worker.idUser));
      dispatch(getSelectedWorkerWorkScheduleAsync.request(worker.idUser));
      dispatch(getSelectedWorkerVacationsLeftDaysAsync.request(worker.idUser));
      dispatch(getSelectedWorkerVacationRequestsAsync.request(worker.idUser));
    },
    [dispatch]
  );

  const acceptVacationRequest = (data: VacationRequestSubmitT) => {
    if (!worker.user.data) return;
    console.log(data);
    const createNewVacationData: ISelectedWorkerVacationCreateNew = {
      userId: worker.user.data.idUser,
      fromDate: data.fromDate,
      toDate: data.toDate,
      absenceId: data.idAbsence,
      substitutionId: data.substitutionId,
    };

    dispatch(createSelectedWorkerVacationsAsync.request(createNewVacationData));
  };

  const cancelVacationRequest = (requestId: VacationRequestIdT) => {
    console.log("Cancel vacation request id.", requestId);
    // dispatch(cancelSelectedWorkerVacationRequestAsync.request(requestId));
  };

  return (
    <div className="content">
      <Card
        title={worker.user.data ? "" : "Wybierz pracownika"}
        content={<UsersSearch onSearch={searchWorker} users={users} />}
      />
      {worker.user.data ? (
        <>
          <Row className="d-flex">
            <Col xl={6}>
              <UserCard user={worker.user.data} />
            </Col>
            <Col xl={6}>
              <Card
                title="Prośby o urlop"
                content={
                  <AdminVacationsRequestForm
                    requests={fakeRequests}
                    potentialSubs={potentialSubs}
                    acceptRequest={acceptVacationRequest}
                    cancelRequest={cancelVacationRequest}
                  />
                }
              />
            </Col>
          </Row>

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
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Worker;
