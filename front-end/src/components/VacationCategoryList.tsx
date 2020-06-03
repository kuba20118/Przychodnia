import React from "react";
import { VacationsCategoryT } from "../state/ducks/vacations/types";

export type VacationsCategoriesProptT = {
  vacationCategories?: VacationsCategoryT[];
};

const VacationCategoryList: React.FC<VacationsCategoriesProptT> = ({
  vacationCategories,
}) => {
  return (
    <ul style={{ margin: 0, paddingLeft: "22px" }}>
      {vacationCategories &&
        vacationCategories.map((item, key) => (
          <li key={key}>
            <p>{item.name}</p>
          </li>
        ))}
    </ul>
  );
};

export default VacationCategoryList;
