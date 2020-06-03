import React from "react";
import { RoleT } from "../state/ducks/role/types";

export type VacationRolesPropsT = {
  roles?: RoleT[];
};

const RoleList: React.FC<VacationRolesPropsT> = ({ roles }) => {
  return (
    <ul style={{ margin: 0, paddingLeft: "22px" }}>
      {roles &&
        roles.map((item, key) => (
          <li key={key}>
            <p>{item.name}</p>
          </li>
        ))}
    </ul>
  );
};

export default RoleList;
