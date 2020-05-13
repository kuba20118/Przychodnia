import React, { useCallback, useMemo, useEffect } from "react";
import {
  SelectedWorkerUpdateT,
  SelectedWorkerUserStateT,
  ISelectedWorker,
} from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/card/Card";
import WorkerEditForm from "../components/WorkerEditForm";
import { RoleT } from "../state/ducks/role/types";
import { updateSelectedWorkerAsync } from "../state/ducks/selected-worker/actions";
import { fetchRoleAsync } from "../state/ducks/role/actions";

const createInitialFormValues = (
  roles: RoleT[],
  worker?: ISelectedWorker
): SelectedWorkerUpdateT => {
  return {
    userId: worker?.idUser!,
    firstName: worker?.firstName!,
    lastName: worker?.lastName!,
    idRole: roles.find((role) => role.name === worker?.role)?.idRole!,
    fireDate: worker?.fireDate!,
    currentlyEmployed: worker?.currentlyEmployed!,
    workingHours: worker?.workingHours!,
  };
};

const WorkerEdit: React.FC = () => {
  const dispatch = useDispatch();

  const fetchRoles = useCallback(() => {
    dispatch(fetchRoleAsync.request());
  }, [dispatch]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const workerState: SelectedWorkerUserStateT = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker.user
  );

  const roles: RoleT[] = useSelector(
    ({ role }: IApplicationState) => role.roles
  );

  const initialFormValues: SelectedWorkerUpdateT = useMemo(
    () => createInitialFormValues(roles, workerState.data),
    [roles, workerState.data]
  );

  const updateSelectedWorkerRequest = useCallback(
    (workerUpdate: SelectedWorkerUpdateT) =>
      dispatch(updateSelectedWorkerAsync.request(workerUpdate)),
    [dispatch]
  );

  return (
    <div className="content">
      <Card
        title="Edytuj dane pracownika"
        content={
          <WorkerEditForm
            initialValues={initialFormValues}
            roles={roles}
            updateWorker={updateSelectedWorkerRequest}
            isLoading={workerState.isLoadingUpdate}
          />
        }
      />
    </div>
  );
};

export default WorkerEdit;
