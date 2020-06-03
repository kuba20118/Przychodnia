import React, { useEffect, useRef } from "react";
import { Row, Col, FormGroup, Form, Container } from "react-bootstrap";
import LoadingButton from "./LoadingButton";
import FormikWithRef from "./helpers/FormikWithRef";
import * as Yup from "yup";
import { FormikProps } from "formik";
import { RoleT } from "../state/ducks/role/types";
import { VacationsCategoryT } from "../state/ducks/vacations/types";

const initialValuesForm = {
  category: "",
};

const validationSchema = Yup.object().shape({
  category: Yup.string().required("*To pole jest wymagane"),
});

type UserVactionRequestFormType = {
  readonly isLoading: boolean;
  readonly categories: VacationsCategoryT[];
  readonly submitRequest: (categoryName: string) => void;
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
          submitRequest(values.category);
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
                    <Form.Label>Typ urlopu</Form.Label>

                    <Form.Control
                      type="text"
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                      className={
                        touched.category && errors.category ? "error" : ""
                      }
                    />
                    {touched.category && errors.category ? (
                      <div className="error-message">{errors.category}</div>
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
