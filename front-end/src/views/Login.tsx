import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { loginUserAsync } from "../state/ducks/user/actions";
import { Container } from "react-bootstrap";
import { UserLoginT } from "../state/ducks/user/types";
import { IApplicationState } from "../state/ducks";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const loginUser = useCallback(
    (userLogin: UserLoginT) => dispatch(loginUserAsync.request(userLogin)),
    [dispatch]
  );

  const errorMsg = useSelector(({ user }: IApplicationState) => {
    return user.error;
  });

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <LoginForm onSubmit={loginUser} errorMsg={errorMsg}></LoginForm>
    </Container>
  );
};

export default Login;
