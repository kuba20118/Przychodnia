import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  FormGroup,
  FormLabel,
  Form,
  Container,
} from "react-bootstrap";
import LoadingButton from "../LoadingButton";
import { addDays, subDays } from "date-fns/esm";
import {
  VacationRequestCreateT,
  VacationsCategoryT,
  LeftVacationsDaysT,
  VacationRequestCreateFormT,
} from "../../state/ducks/vacations/types";
import FormikWithRef from "../helpers/FormikWithRef";
import * as Yup from "yup";
import { FormikProps } from "formik";
import { DatePickerField } from "../helpers/DatePickerField";

const initialUserVacationsRequest: VacationRequestCreateFormT = {
  fromDate: new Date(),
  toDate: new Date(),
  reason: "",
  idAbsence: 1,
};

const validationSchema = Yup.object().shape({
  fromDate: Yup.date().required("*To pole jest wymagane"),
  toDate: Yup.date().required("*To pole jest wymagane"),
  reason: Yup.string().max(100),
  idAbsence: Yup.string().required("*To pole jest wymagane"),
});

type UserVactionRequestFormType = {
  readonly isLoading: boolean;
  readonly absenceCategories: VacationsCategoryT[];
  readonly leftVacationsDays?: LeftVacationsDaysT[];
  readonly submitRequest: (requestFormData: VacationRequestCreateFormT) => void;
};

const UserVacationsRequestForm: React.FC<UserVactionRequestFormType> = ({
  isLoading,
  absenceCategories,
  leftVacationsDays,
  submitRequest,
}) => {
  const formik = useRef<FormikProps<any>>(null);
  const [leftDays, setLeftDays] = useState(0);

  useEffect(() => {
    if (leftVacationsDays!.length > 1) {
      setLeftDays(leftVacationsDays![0].leftDays);
    }
  }, [leftVacationsDays, setLeftDays]);

  useEffect(() => {
    if (!isLoading) {
      formik?.current?.resetForm();
      formik?.current?.setSubmitting(false);
    }
  }, [isLoading]);

  const handleCategoryChange = (categoryId: string) => {
    const categoryIdNum = parseInt(categoryId);
    const category =
      absenceCategories &&
      absenceCategories.find(
        (category) => category.idAbsence === categoryIdNum
      );

    if (category) {
      setLeftDays(category.limit);
    }
  };

  return (
    <>
      <FormikWithRef
        ref={formik}
        initialValues={initialUserVacationsRequest}
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
                <Col md={6}>
                  <FormGroup>
                    <Form.Label>Typ urlopu</Form.Label>
                    <Form.Control
                      as="select"
                      name="idAbsence"
                      onChange={(e) => {
                        handleCategoryChange(e.currentTarget.value);
                        formik.current?.setFieldValue(
                          "idAbsence",
                          parseInt(e.currentTarget.value, 10)
                        );
                      }}
                      onBlur={handleBlur}
                      value={values.idAbsence}
                      className={
                        touched.idAbsence && errors.idAbsence ? "error" : ""
                      }
                    >
                      {absenceCategories &&
                        absenceCategories.map((category, key) => (
                          <option key={key} value={category.idAbsence}>
                            {category.name}
                          </option>
                        ))}
                    </Form.Control>
                    {touched.categoryId && errors.categoryId ? (
                      <div className="error-message">{errors.categoryId}</div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Form.Label>Przyczyna</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="reason"
                      onBlur={handleBlur}
                      value={values.reason}
                      onChange={handleChange}
                      placeholder="I was ill..."
                      className={touched.reason && errors.reason ? "error" : ""}
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="py-2">
                  <div className="block">
                    <FormLabel>Start</FormLabel>
                    <DatePickerField
                      name="fromDate"
                      value={values.fromDate}
                      onChange={handleChange}
                      minDate={new Date()}
                    />
                    {touched.fromDate && errors.fromDate ? (
                      <div className="error-message">{errors.fromDate}</div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} className="py-2">
                  <div className="block">
                    <FormLabel>Koniec</FormLabel>
                    <DatePickerField
                      name="toDate"
                      selected={values.toDate}
                      onChange={handleChange}
                      minDate={subDays(values.fromDate, 0)}
                      maxDate={addDays(values.fromDate, leftDays)}
                    />
                    {touched.toDate && errors.toDate ? (
                      <div className="error-message">{errors.toDate}</div>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Container>
            <Row className="py-2">
              <Col className="text-right">
                <LoadingButton
                  variant="primary"
                  defaultText="Wyślij prośbę"
                  defaultType="submit"
                  isLoading={isSubmitting}
                ></LoadingButton>
              </Col>
            </Row>
          </Form>
        )}
      </FormikWithRef>
    </>
  );
};

export default UserVacationsRequestForm;
