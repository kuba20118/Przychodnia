import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RoleT, RoleStateT } from "../../state/ducks/role/types";
import { IApplicationState } from "../../state/ducks";
import { Row, Col } from "react-bootstrap";
import RoleList from "../../components/RoleList";
import VacationCategoryList from "../../components/VacationCategoryList";
import Card from "../../components/card/Card";
import { VacationsStateT } from "../../state/ducks/vacations/types";
import { fetchRoleAsync, addRoleAsync } from "../../state/ducks/role/actions";
import {
  getVacationsCategoriesAsync,
  addVacationCategoryAsync,
} from "../../state/ducks/vacations/actions";
import RoleForm from "../../components/RoleForm";
import VacationCategoryForm from "../../components/VacationCategoryForm";

const DictionaryData: React.FC = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoleAsync.request());
    dispatch(getVacationsCategoriesAsync.request());
  }, []);

  const role: RoleStateT = useSelector(({ role }: IApplicationState) => role);

  const vacations: VacationsStateT = useSelector(
    ({ vacations }: IApplicationState) => vacations
  );

  const addRole = useCallback(
    (roleName: string) => dispatch(addRoleAsync.request(roleName)),
    [dispatch]
  );

  const addVacationCategory = useCallback(
    (categoryName: string) =>
      dispatch(addVacationCategoryAsync.request(categoryName)),
    [dispatch]
  );

  return (
    <div className="content">
      <Row>
        <Col md={6}>
          <Card
            title="Role w systemie"
            content={<RoleList roles={role.roles} />}
          />
        </Col>
        <Col md={6}>
          <Card
            title="Typy urlopów"
            content={
              <VacationCategoryList vacationCategories={vacations.categories} />
            }
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card
            title="Dodaj rolę"
            content={
              <RoleForm
                roles={role.roles}
                submitRequest={addRole}
                isLoading={role.isLoadingAdd}
              />
            }
          />
        </Col>
        <Col md={6}>
          <Card
            title="Dodaj typ urlopu"
            content={
              <VacationCategoryForm
                categories={vacations.categories}
                submitRequest={addVacationCategory}
                isLoading={vacations.isLoadingAddCategory}
              />
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default DictionaryData;
