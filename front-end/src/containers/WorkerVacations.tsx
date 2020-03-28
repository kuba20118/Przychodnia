import React from "react";
import { useSelector } from "react-redux";
import { ISelectedWorkerVacations } from "../state/ducks/selected-worker/types";
import { IApplicationState } from "../state/ducks";
import VacationsForm, { VacationsFormDataT } from "../components/VacationsForm";
import Card from "../components/Card";
import CustomTable, {
  CustomTableDataT,
  CustomTableHeaderT
} from "../components/CustomTable";
import { format, parseISO } from "date-fns/esm";

const WorkerVacations: React.FC = () => {
  const vacations: ISelectedWorkerVacations[] | undefined = useSelector(
    ({ selectedWorker }: IApplicationState) => selectedWorker.vacations
  );
  const assignHolidays = (data: VacationsFormDataT) => {
    console.log("DATA IN PARENT", data);
  };

  const tableHeader: CustomTableHeaderT = ["#", "Od", "Do", "Typ"];

  const tableData: CustomTableDataT | undefined =
    vacations &&
    vacations!.map((item, index) => {
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
      <Card
        title="Przydziel urlop"
        content={<VacationsForm leftDays={14} onSubmit={assignHolidays} />}
      />
      <Card
        title="Historia urlopów"
        content={
          <div className="content">
            <CustomTable header={tableHeader} data={tableData} />
          </div>
        }
      />
    </div>
  );
};

export default WorkerVacations;
