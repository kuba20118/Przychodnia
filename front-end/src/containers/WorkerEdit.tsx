import React from "react";
import { ISelectedWorker } from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const WorkerEdit: React.FC = () => {
  const worker: ISelectedWorker | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker.worker
  );

  return (
    <div className="content">
      <Card title="Edytuj dane pracownika" content={<>bla bla... tbc.</>} />
    </div>
  );
};

export default WorkerEdit;
