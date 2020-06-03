import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable, {
  CustomTableHeaderT,
  CustomTableDataT,
} from "../../components/CustomTable";
import { IApplicationState } from "../../state/ducks";
import Card from "../../components/card/Card";
import {
  getAllSubstitutionsAsync,
  getAllPastSubstitutionsAsync,
} from "../../state/ducks/substitution/actions";
import { SubstitutionT } from "../../state/ducks/substitution/types";
import { format } from "date-fns";

const tableHeader: CustomTableHeaderT = ["#", "Imię", "Nazwisko", "Od", "Do"];

const createTableData = (subs: SubstitutionT[]): CustomTableDataT =>
  subs.map((item, index) => [
    (index + 1).toString(),
    item.firstName || "",
    item.lastName || "",
    format(new Date(item.fromDate), "dd-MM-yyyy"),
    format(new Date(item.toDate), "dd-MM-yyyy"),
  ]);

const Substitutions: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubstitutionsAsync.request());
    dispatch(getAllPastSubstitutionsAsync.request());
  }, []);

  const substitution: SubstitutionT[] = useSelector(
    ({ substitution }: IApplicationState) => substitution.subs
  );

  const pastSubstitution: SubstitutionT[] = useSelector(
    ({ substitution }: IApplicationState) => substitution.pastSubs
  );

  return (
    <div className="content">
      <Card
        title="Obecne zastępstwa"
        subtitle={`Dane dotyczą wszystkich użytkowników`}
        content={
          <div className="content">
            {substitution && substitution!.length > 0 ? (
              <CustomTable
                header={tableHeader}
                data={createTableData(substitution)}
              />
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
            {pastSubstitution && pastSubstitution!.length > 0 ? (
              <CustomTable
                header={tableHeader}
                data={createTableData(pastSubstitution)}
              />
            ) : (
              <p>Historia jest pusta.</p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Substitutions;
