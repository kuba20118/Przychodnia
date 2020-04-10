import React, { useRef, useEffect } from "react";
import FormikWithRef from "./FormikWithRef";
import { FormikProps, useFormikContext } from "formik";
import * as Yup from "yup";
import { RoleT } from "../state/ducks/role/types";
import { SelectedWorkerUpdateT } from "../state/ducks/selected-worker/types";
import { Form, Col } from "react-bootstrap";
import { DatePickerField } from "./DatePickerField";
import LoadingButton from "./LoadingButton";

type WorkerEditFormPropsT = {
  readonly initialValues: SelectedWorkerUpdateT;
  readonly updateWorker: (data: SelectedWorkerUpdateT) => void;
  readonly isLoading: boolean;
  readonly roles: RoleT[];
};

const initialUserRegisterData: SelectedWorkerUpdateT = {
  userId: "",
  firstName: "",
  lastName: "",
  idRole: 1,
  fireDate: "",
  currentlyEmployed: true,
  workingHours: 0,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "*Imię musi być dłuższe niż 2 znaki")
    .max(100, "*Imię nie może być dłuższ niż 100 znaków")
    .required("*To pole jest wymagane"),
  lastName: Yup.string().required("*To pole jest wymagane"),
  roleId: Yup.number(),
  fireDate: Yup.date().nullable(),
  currentlyEmployed: Yup.boolean().nullable(),
  workingHours: Yup.number().required("*To pole jest wymagane"),
});

const WorkerEditForm: React.FC<WorkerEditFormPropsT> = ({
  initialValues = initialUserRegisterData,
  updateWorker,
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
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          updateWorker(values);
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
              <Form.Group as={Col}>
                <Form.Label>Rola</Form.Label>
                <Form.Control
                  as="select"
                  name="idRole"
                  onChange={(e) => {
                    formik.current?.setFieldValue(
                      "idRole",
                      parseInt(e.currentTarget.value, 10)
                    );
                  }}
                  onBlur={handleBlur}
                  className={touched.idRole && errors.idRole ? "error" : ""}
                >
                  {roles.map((role, key) => (
                    <option key={key} value={role.idRole}>
                      {role.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group
                as={Col}
                className="d-flex align-items-center pl-3 pt-4"
              >
                <Form.Check
                  type="checkbox"
                  name="currentlyEmployed"
                  label="Aktualnie zatrudniony"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currentlyEmployed}
                  className={
                    touched.currentlyEmployed && errors.currentlyEmployed
                      ? "error"
                      : ""
                  }
                />
                {touched.currentlyEmployed && errors.currentlyEmployed ? (
                  <div className="error-message">
                    {errors.currentlyEmployed}
                  </div>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <div className="block">
                  <Form.Label>Data zwolnienia</Form.Label>
                  <DatePickerField
                    name="fireDate"
                    value={new Date(values.fireDate)}
                    onChange={handleChange}
                  />
                  {touched.fireDate && errors.fireDate ? (
                    <div className="error-message">{errors.fireDate}</div>
                  ) : null}
                </div>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Godziny pracy</Form.Label>

                <Form.Control
                  type="number"
                  name="workingHours"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workingHours}
                  className={
                    touched.workingHours && errors.workingHours ? "error" : ""
                  }
                />
                {touched.workingHours && errors.workingHours ? (
                  <div className="error-message">{errors.workingHours}</div>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col className="py-2 text-right">
                <LoadingButton
                  variant="primary"
                  defaultText="Aktualizuj"
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

export default WorkerEditForm;
