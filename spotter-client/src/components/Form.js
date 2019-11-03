import React from "react";

import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SpotterForm = ({ status, errors, touched, action, api, history, children }) => {
  return (
    <div className="form-container">
      <div className="logo-container">
        <div>{children}</div>
      </div>
      <div className="form-sub-container">
        <p className="form-head">{action}</p>
        {status && <p className="api-err-box">{status}</p>}
        <Form data-testid="test-form" className="form">
          <label className="form-label">Email</label>
          <Field
            className="form-field"
            name="email"
            placeholder="name@email.com"
            type="email"
          />
          {touched.email && errors.email && <p className="form-error email">{errors.email}</p>}
          <label className="form-label">Password</label>
          <Field
            className="form-field"
            name="password"
            placeholder="Password"
            type="password"
          />
          {touched.password && errors.password && <p className="form-error pass">{errors.password}</p>}
          <button data-testid="form-submit" className="form-button" type="submit">
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
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
  }),
  async handleSubmit(values, { props, resetForm, setStatus }) {
    try {
      const res = await axios.post(props.api, values);
      resetForm();
      localStorage.setItem("token", res.data.token);
      props.history.push("/dashboard");
    } catch (error) {
      setStatus(error.response.data.error);
    }
  }
})(SpotterForm);

export default FormikForm;
