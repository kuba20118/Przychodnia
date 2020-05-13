import React, { useCallback, useEffect, useState } from "react";
import Card from "../../components/card/Card";
import RegistrationForm from "../../components/auth/RegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoleAsync } from "../../state/ducks/role/actions";
import { IApplicationState } from "../../state/ducks";
import { RoleT } from "../../state/ducks/role/types";
import { UserRegisterT } from "../../state/ducks/user/types";
import { registerUserAsync } from "../../state/ducks/user/actions";
import { Container } from "react-bootstrap";

const Registration: React.FC = () => {
  const dispatch = useDispatch();

  const fetchRole = useCallback(() => dispatch(fetchRoleAsync.request()), [
    dispatch,
  ]);

  useEffect(() => {
    fetchRole();
  }, []);

  const roles: RoleT[] = useSelector(
    ({ role }: IApplicationState) => role.roles
  );

  const registerUser = (newUser: UserRegisterT) => {
    dispatch(registerUserAsync.request(newUser));
  };

  const isLoadingRegistration = useSelector(
    ({ user }: IApplicationState) => user.isLoadingRegistration
  );

  return (
    <div className="content">
      <Card
        title="Rejestracja"
        content={
          <Container>
            <RegistrationForm
              registerUser={registerUser}
              roles={roles}
              isLoading={isLoadingRegistration}
            />
          </Container>
        }
      ></Card>
    </div>
  );
};

export default Registration;
