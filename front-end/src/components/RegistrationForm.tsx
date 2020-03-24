import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row
} from "react-bootstrap";

type RegistrationFormPropsT = {
  registerUser: () => void;
};

const roles = ["pracownik", "kierownik", "rejestratorka", "admin"];

const RegistrationForm: React.FC<RegistrationFormPropsT> = ({
  registerUser
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const setFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };
  const setLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };
  const setRoleInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.currentTarget.value);
  };
  const setLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value);
  };
  const setPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <form onSubmit={registerUser}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <FormLabel>Imię</FormLabel>
            <FormControl
              type="text"
              value={firstName}
              onChange={setFirstNameInput}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <FormLabel>Nazwisko</FormLabel>
            <FormControl
              type="text"
              value={lastName}
              onChange={setLastNameInput}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <FormLabel>Rola</FormLabel>
            <FormControl as="select" value={role} onChange={setRoleInput}>
              {roles.map((role, key) => (
                <option key={key}>{role}</option>
              ))}
            </FormControl>
          </FormGroup>
        </Col>
        <Col md={6}></Col>
      </Row>
      <Row>
        <Col md={6}>
          {" "}
          <FormGroup>
            <FormLabel>Login</FormLabel>
            <FormControl type="text" value={login} onChange={setLoginInput} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={setPasswordInput}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="py-2 text-right">
          <Button type="submit">Rejestruj</Button>
        </Col>
      </Row>
    </form>
  );
};

export default RegistrationForm;
