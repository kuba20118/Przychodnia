import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import { loginUserAsync } from "../state/ducks/user/actions";
import { Container } from "react-bootstrap";
import { UserCredentialsT } from "../state/ducks/user/types";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const loginUser = useCallback(
    (userLogin: UserCredentialsT) =>
      dispatch(loginUserAsync.request(userLogin)),
    [dispatch]
  );

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <LoginForm onSubmit={loginUser}></LoginForm>
    </Container>
  );
};

export default Login;
