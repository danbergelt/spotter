import React from "react";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const SpotterForm = ({ action, children }) => {
  return (
    <div className="form-container">
      <div className="logo-container">
        <div>{children}</div>
      </div>
      <div className="form-sub-container">
        <p className="form-head">{action}</p>
        <Form className="form">
          <label className="form-label">Email</label>
          <Field
            className="form-field"
            name="email"
            placeholder="name@email.com"
            type="email"
          />
          <label className="form-label">Password</label>
          <Field
            className="form-field"
            name="password"
            placeholder="Password"
            type="password"
          />
          <button className="form-button" type="submit">
            {action}
          </button>
        </Form>
      </div>
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!")
  }),
  handleSubmit(values, { resetForm }) {
    // need to convert to API calls, for now just console logging input vals

    console.log(values);
    resetForm();
  }
})(SpotterForm);

export default FormikForm;
