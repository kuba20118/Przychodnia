import React, { useCallback, useMemo, useState } from "react";
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
  getSelectedWorkerVacationRequestsAsync,
  removeSelectedWorkerVacationRequestsAsync,
  acceptSelectedWorkerVacationRequestsAsync,
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
import { getPotentialsSubs } from "../../state/ducks/vacations/operations";

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
    const createNewVacationData: ISelectedWorkerVacationCreateNew = {
      userId: worker.user.data.idUser,
      fromDate: data.fromDate,
      toDate: data.toDate,
      absenceId: data.idAbsence,
      substitutionId: data.substitutionId,
    };

    dispatch(
      acceptSelectedWorkerVacationRequestsAsync.request(createNewVacationData)
    );
  };

  const cancelVacationRequest = (requestId: VacationRequestIdT) => {
    dispatch(removeSelectedWorkerVacationRequestsAsync.request(requestId));
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
                    requests={worker.vacation.requests}
                    potentialSubs={potentialSubs}
                    acceptRequest={acceptVacationRequest}
                    cancelRequest={cancelVacationRequest}
                    isAcceptRequestError={worker.vacation.isRequestAcceptError}
                    isAcceptLoading={worker.vacation.isLoadingAcceptRequest}
                    isCancelLoading={worker.vacation.isLoadingRemoveRequest}
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
