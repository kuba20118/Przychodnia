import React, { useEffect, useRef } from "react";
import { Row, Col, FormGroup, Form, Container } from "react-bootstrap";
import LoadingButton from "./LoadingButton";
import FormikWithRef from "./helpers/FormikWithRef";
import * as Yup from "yup";
import { FormikProps } from "formik";
import { RoleT } from "../state/ducks/role/types";

const initialValuesForm = {
  role: "",
};

const validationSchema = Yup.object().shape({
  role: Yup.string().required("*To pole jest wymagane"),
});

type UserVactionRequestFormType = {
  readonly isLoading: boolean;
  readonly roles: RoleT[];
  readonly submitRequest: (roleName: string) => void;
};

const RoleForm: React.FC<UserVactionRequestFormType> = ({
  isLoading,
  roles,
  submitRequest,
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
        initialValues={initialValuesForm}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          submitRequest(values.role);
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
          <Form onSubmit={handleSubmit} className="form-vacations">
            <Container fluid>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Rola</Form.Label>

                    <Form.Control
                      type="text"
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                      className={touched.role && errors.role ? "error" : ""}
                    />
                    {touched.role && errors.role ? (
                      <div className="error-message">{errors.role}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col className="text-left" style={{ marginTop: "32px" }}>
                  <LoadingButton
                    variant="primary"
                    defaultText="Dodaj"
                    defaultType="submit"
                    isLoading={isSubmitting}
                  ></LoadingButton>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </FormikWithRef>
    </>
  );
};

export default RoleForm;
