import React, { useCallback } from "react";
import { Switch, Route } from "react-router";
import { IRouteComponentProps } from "../routing/routes";
import Card from "../components/Card";
import UsersSearch from "../components/UsersSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedWorker,
  getSelectedWorkerVacationsAsync,
  getSelectedWorkerWorkScheduleAsync,
  getSelectedWorkerVacationsLeftDaysAsync
} from "../state/ducks/selected-worker/actions";
import { ISelectedWorker } from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import UserCard from "../components/CardUser";
import { UserT } from "../state/ducks/user/types";

const Worker: React.FC<IRouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  const users: UserT[] | undefined = useSelector(
    ({ user }: IApplicationState) => user.users
  );

  const worker: ISelectedWorker | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker.worker
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

  return (
    <div className="content">
      <Card
        title={worker ? "" : "Wybierz pracownika"}
        content={<UsersSearch onSearch={searchWorker} users={users} />}
      />
      {worker ? <UserCard user={worker} /> : ""}

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
