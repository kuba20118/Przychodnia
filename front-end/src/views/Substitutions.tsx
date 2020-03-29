import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable, {
  CustomTableHeaderT,
  CustomTableDataT
} from "../components/CustomTable";
import { IApplicationState } from "../state/ducks";
import { UserT } from "../state/ducks/user/types";
import Card from "../components/Card";

const Substitutions: React.FC = () => {
  const dispatch = useDispatch();

  // const fetchAllSubstitutions = useCallback(
  //   () => dispatch(fetchAllSubstitutionsAsync.request()),
  //   [dispatch]
  // );

  // useEffect(() => {
  //   fetchAllSubstitutions();
  // }, []);

  // const vacations: SubstitutionsDataT[] | undefined = useSelector(
  //   ({ substitutions }: IApplicationState) => subtitutions.all
  // );

  // const users: UserT[] | undefined = useSelector(
  //   ({ user }: IApplicationState) => user.users
  // );

  const tableHeader: CustomTableHeaderT = ["#", "Imię", "Nazwisko", "Od", "Do"];

  const tableData: CustomTableDataT = [];

  return (
    <div className="content">
      <Card
        title="Obecne zastępstwa"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            {tableData && tableData!.length > 0 ? (
              <CustomTable header={tableHeader} data={tableData} />
            ) : (
              <p>Obecnie nie ma żadnych zastępstw.</p>
            )}
          </div>
        }
      />

      <Card
        title="Historia zastępstw"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            <p>Historia jest pusta.</p>
          </div>
        }
      />
    </div>
  );
};

export default Substitutions;
