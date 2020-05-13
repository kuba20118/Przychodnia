import React from "react";
import { LeftVacationsDaysT } from "../../state/ducks/selected-worker/types";

export type VacationsLeftDaysProptT = {
  leftDays?: LeftVacationsDaysT[];
};

const VacationsLeftDays: React.FC<VacationsLeftDaysProptT> = ({ leftDays }) => {
  return (
    <div>
      {leftDays &&
        leftDays.map((item, key) => (
          <p key={key}>
            <b>{item.vacationType}: </b>
            {item.leftDays} dni
          </p>
        ))}
    </div>
  );
};

export default VacationsLeftDays;
