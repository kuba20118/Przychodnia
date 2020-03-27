import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row
} from "react-bootstrap";
import { UserRegisterT } from "../state/ducks/user/types";
import { RoleT } from "../state/ducks/role/types";
import LoadingButton from "./LoadingButton";
import { Form } from "react-bootstrap";

type RegistrationFormPropsT = {
  registerUser: (data: UserRegisterT) => void;
  isLoading: boolean;
  roles: RoleT[];
};

const RegistrationForm: React.FC<RegistrationFormPropsT> = ({
  registerUser,
  isLoading,
  roles
}) => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("1");
  const [email, setEmail] = useState("");
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
    setEmail(e.currentTarget.value);
  };
  const setPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const newUser: UserRegisterT = {
        firstName,
        lastName,
        role: parseInt(role),
        mail: email,
        password
      };
      registerUser(newUser);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitRegister}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Imię</Form.Label>

          <Form.Control
            required
            type="text"
            value={firstName}
            onChange={setFirstNameInput}
          />
          <Form.Control.Feedback type="invalid">
            Imię jest wymagane.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            required
            type="text"
            value={lastName}
            onChange={setLastNameInput}
          />
          <Form.Control.Feedback type="invalid">
            Nazwisko jest wymagane.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md={6}>
          <Form.Label>Rola</Form.Label>
          <Form.Control
            required
            as="select"
            value={role}
            onChange={setRoleInput}
          >
            {roles.map((role, key) => (
              <option key={key} value={role.idRole}>
                {role.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Rola jest wymagana.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            value={email}
            onChange={setLoginInput}
          />
          <Form.Control.Feedback type="invalid">
            Email jest wymagany.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            onChange={setPasswordInput}
          />
          <Form.Control.Feedback type="invalid">
            Hasło jest wymagane.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col className="py-2 text-right">
          <LoadingButton
            variant="primary"
            defaultText="Rejestruj"
            defaultType="submit"
            isLoading={isLoading}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

export default RegistrationForm;
