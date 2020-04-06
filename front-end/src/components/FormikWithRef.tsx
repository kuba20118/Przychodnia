import React, { forwardRef, useImperativeHandle, Ref } from "react";
import { Formik, FormikProps, FormikConfig } from "formik";

function FormikWithRef(props: FormikConfig<any>, ref: Ref<any>) {
  let _formikProps: FormikProps<any>;

  useImperativeHandle(ref, () => _formikProps);

  return (
    <Formik {...props}>
      {(formikProps) => {
        _formikProps = formikProps;
        if (typeof props.children === "function") {
          return props.children(formikProps);
        }
        return props.children;
      }}
    </Formik>
  );
}

export default forwardRef(FormikWithRef);
