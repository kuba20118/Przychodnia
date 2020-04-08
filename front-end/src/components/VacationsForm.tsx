import React, { useState, useRef, useEffect } from "react";
import { Button, Row, Col, FormGroup, FormLabel, Form } from "react-bootstrap";
import { addDays, subDays } from "date-fns/esm";
import { UserT } from "../state/ducks/user/types";
import { VacationsCategoryT } from "../state/ducks/vacations/types";
import FormikWithRef from "./FormikWithRef";
import * as Yup from "yup";
import { FormikProps } from "formik";
import { DatePickerField } from "./DatePickerField";
import { LeftVacationsDaysT } from "../state/ducks/selected-worker/types";
import LoadingButton from "./LoadingButton";

export type VacationsFormDataT = {
  fromDate: Date;
  toDate: Date;
  categoryId: number;
  substitutionId: string;
};

type VacationsFormPropsT = {
  readonly categories?: VacationsCategoryT[];
  readonly potentialSubs?: UserT[];
  readonly leftVacationsDays?: LeftVacationsDaysT[];
  readonly createNewVacation: (data: VacationsFormDataT) => void;
  isLoading: boolean;
};

const initialVacationsFormData: VacationsFormDataT = {
  fromDate: new Date(),
  toDate: new Date(),
  categoryId: 1,
  substitutionId: "",
};

const validationSchema = Yup.object().shape({
  fromDate: Yup.date().required("*To pole jest wymagane"),
  toDate: Yup.date().required("*To pole jest wymagane"),
  categoryId: Yup.number().required("*To pole jest wymagane"),
  substitutionId: Yup.string().required("*To pole jest wymagane"),
});

const VacationsForm: React.FC<VacationsFormPropsT> = ({
  categories,
  potentialSubs,
  leftVacationsDays,
  createNewVacation,
  isLoading,
}) => {
  const formik = useRef<FormikProps<any>>(null);
  const [leftDays, setLeftDays] = useState(0);

  useEffect(() => {
    if (leftVacationsDays) {
      setLeftDays(leftVacationsDays[0].leftDays);
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
      categories &&
      categories.find((category) => category.idAbsence === categoryIdNum);

    if (category) {
      setLeftDays(category.limit);
    }
  };

  return (
    <>
      <FormikWithRef
        ref={formik}
        initialValues={initialVacationsFormData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          createNewVacation(values);
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
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Form.Label>Typ urlopu</Form.Label>
                  <Form.Control
                    as="select"
                    name="categoryId"
                    onChange={(e) => {
                      handleCategoryChange(e.currentTarget.value);
                      formik.current?.setFieldValue(
                        "categoryId",
                        parseInt(e.currentTarget.value, 10)
                      );
                    }}
                    onBlur={handleBlur}
                    value={values.categoryId}
                    className={
                      touched.category && errors.category ? "error" : ""
                    }
                  >
                    {categories &&
                      categories.map((category, key) => (
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
                <Form.Label>Zastępstwo</Form.Label>
                <Form.Control
                  as="select"
                  name="substitutionId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.substitutionId}
                  className={touched.category && errors.category ? "error" : ""}
                >
                  <option disabled value="">
                    -- wybierz pracownika --
                  </option>
                  {potentialSubs &&
                    potentialSubs.map((sub, key) => (
                      <option key={key} value={sub.idUser}>
                        {sub.firstName} {sub.lastName}
                      </option>
                    ))}
                </Form.Control>
                {touched.substitutionId && errors.substitutionId ? (
                  <div className="error-message">{errors.substitutionId}</div>
                ) : null}
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
            <Row></Row>
            <Row className="py-2">
              <Col className="text-right">
                <LoadingButton
                  variant="primary"
                  defaultText="Przydziel urlop"
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

export default VacationsForm;
