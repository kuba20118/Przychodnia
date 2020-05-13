import React from "react";
import { useSelector } from "react-redux";
import { RoleT } from "../../state/ducks/role/types";
import { IApplicationState } from "../../state/ducks";

const DictionaryData: React.FC = ({}) => {
  const roles: RoleT[] = useSelector(
    ({ role }: IApplicationState) => role.roles
  );

  return <></>;
};

export default DictionaryData;
