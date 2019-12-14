import React from "react";
import { Formik, Form, Field } from "formik";
import { ValidationSchema } from "./ValidationSchema";

const ChangePasswordForm = () => {
  return (
    <div className="change-password-form">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="change-password-inp">
              <label className="change-password-label">Old Password</label>
              <Field
                data-testid="old"
                className="inp-component"
                name="oldPassword"
                type="password"
              />
            </div>
            <div className="change-password-inp">
              <label className="change-password-label">New Password</label>
              <Field
                data-testid="new"
                className="inp-component"
                name="newPassword"
                type="password"
              />
            </div>
            <div className="change-password-inp">
              <label className="change-password-label">Confirm Password</label>
              <Field
                data-testid="confirm"
                className="inp-component"
                name="confirmPassword"
                type="password"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <button data-testid="save" className="change-password-button" type="submit">
                Save
              </button>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="change-password-err">{errors.confirmPassword}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
