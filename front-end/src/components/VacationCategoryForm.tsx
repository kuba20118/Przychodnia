import React, { useEffect, useRef } from "react";
import { Row, Col, FormGroup, Form, Container } from "react-bootstrap";
import LoadingButton from "./LoadingButton";
import FormikWithRef from "./helpers/FormikWithRef";
import * as Yup from "yup";
import { FormikProps } from "formik";
import {
  VacationsCategoryT,
  VacationCategoryCreateT,
} from "../state/ducks/vacations/types";

const initialValuesForm = {
  name: "",
  limit: 0,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*To pole jest wymagane"),
  limit: Yup.number().required("*To pole jest wymagane"),
});

type UserVactionRequestFormType = {
  readonly isLoading: boolean;
  readonly categories: VacationsCategoryT[];
  readonly submitRequest: (vacationCategory: VacationCategoryCreateT) => void;
};

const VacationCategoryForm: React.FC<UserVactionRequestFormType> = ({
  isLoading,
  categories,
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
          submitRequest(values);
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
                  <FormGroup>
                    <Form.Label>Nazwa nieobecności</Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={touched.name && errors.name ? "error" : ""}
                    />
                    {touched.name && errors.name ? (
                      <div className="error-message">{errors.name}</div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label>Roczny limit dni</Form.Label>

                    <Form.Control
                      type="number"
                      name="limit"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.limit}
                      className={touched.limit && errors.limit ? "error" : ""}
                    />
                    {touched.limit && errors.limit ? (
                      <div className="error-message">{errors.limit}</div>
                    ) : null}
                  </FormGroup>
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

export default VacationCategoryForm;
