import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import { loginUserAsync } from "../state/ducks/user/actions";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const loginUser = useCallback(() => dispatch(loginUserAsync.request()), [
    dispatch
  ]);

  return (
    <div className="login-page">
      <LoginForm onSubmit={loginUser}></LoginForm>
    </div>
  );
};

export default Login;
