import React, { useState, FormEvent } from "react";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { UserLoginT } from "../state/ducks/user/types";

type LoginFormPropsT = {
  readonly onSubmit: (userLogin: UserLoginT) => void;
  readonly errorMsg?: string;
};

const LoginForm: React.FC<LoginFormPropsT> = ({ onSubmit, errorMsg }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setEmailInput = (e: FormEvent<FormControl & HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const setPasswordInput = (e: FormEvent<FormControl & HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className="login-form card" onSubmit={submit}>
      <p>{errorMsg}</p>
      <FormGroup>
        <FormLabel>E-mail</FormLabel>
        <FormControl type="text" value={email} onChange={setEmailInput} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Hasło</FormLabel>
        <FormControl
          type="password"
          value={password}
          onChange={setPasswordInput}
        />
      </FormGroup>
      <Button type="submit" className="login-form__btn btn-primary">
        Zaloguj się
      </Button>
    </form>
  );
};

export default LoginForm;
