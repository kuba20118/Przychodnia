import React, { useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import { UserRegisterT } from "../state/ducks/user/types";
import { RoleT } from "../state/ducks/role/types";
import LoadingButton from "./LoadingButton";
import { FormikProps } from "formik";
import * as Yup from "yup";
import FormikWithRef from "./FormikWithRef";

type RegistrationFormPropsT = {
  readonly registerUser: (data: UserRegisterT) => void;
  readonly isLoading: boolean;
  readonly roles: RoleT[];
};

const initialUserRegisterData: UserRegisterT = {
  firstName: "",
  lastName: "",
  role: 1,
  mail: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "*First name must have at least 2 characters")
    .max(100, "*First name can't be longer than 100 characters")
    .required("*First name is required"),
  lastName: Yup.string().required("*First name is required"),
  role: Yup.number().required(),
  mail: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  password: Yup.string()
    .min(6, "*Password must have at least 6 characters")
    .max(100, "*Password can't be longer than 100 characters")
    .required("*Password is required"),
});

const RegistrationForm: React.FC<RegistrationFormPropsT> = ({
  registerUser,
  isLoading,
  roles,
}) => {
  const formik = useRef<FormikProps<any>>(null);

  useEffect(() => {
    if (!isLoading) {
      formik?.current?.resetForm();
      formik?.current?.setSubmitting(false);
    }
  }, [isLoading]);

  return (
    <>
      <FormikWithRef
        ref={formik}
        initialValues={initialUserRegisterData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          registerUser(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Imię</Form.Label>

                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={
                    touched.firstName && errors.firstName ? "error" : ""
                  }
                />
                {touched.firstName && errors.firstName ? (
                  <div className="error-message">{errors.firstName}</div>
                ) : null}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Nazwisko</Form.Label>

                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={touched.lastName && errors.lastName ? "error" : ""}
                />
                {touched.lastName && errors.lastName ? (
                  <div className="error-message">{errors.lastName}</div>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label>Rola</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  className={touched.role && errors.role ? "error" : ""}
                >
                  {roles.map((role, key) => (
                    <option key={key} value={role.idRole}>
                      {role.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="text"
                  name="mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mail}
                  className={touched.mail && errors.mail ? "error" : ""}
                />
                {touched.mail && errors.mail ? (
                  <div className="error-message">{errors.mail}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Hasło</Form.Label>

                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={touched.password && errors.password ? "error" : ""}
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col className="py-2 text-right">
                <LoadingButton
                  variant="primary"
                  defaultText="Rejestruj"
                  defaultType="submit"
                  isLoading={isSubmitting}
                />
              </Col>
            </Form.Row>
          </Form>
        )}
      </FormikWithRef>
    </>
  );
};

export default RegistrationForm;
