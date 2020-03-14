import React, { useState, FormEvent } from "react";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";

type LoginFormPropsT = {
  onSubmit: () => void;
};

const LoginForm: React.FC<LoginFormPropsT> = (props: LoginFormPropsT) => {
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

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onSubmit();
  };

  return (
    <div className="login-page">
      <form>
        <FormGroup>
          <FormLabel>E-mail</FormLabel>
          <FormControl type="text" value={email} onChange={setEmailInput} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type="text"
            value={password}
            onChange={setPasswordInput}
          />
        </FormGroup>
        <Button onClick={submit}>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
