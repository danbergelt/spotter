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
                className="inp-component"
                name="oldPassword"
                type="string"
              />
            </div>
            <div className="change-password-inp">
              <label className="change-password-label">New Password</label>
              <Field
                className="inp-component"
                name="newPassword"
                type="string"
              />
            </div>
            <div className="change-password-inp">
              <label className="change-password-label">Confirm Password</label>
              <Field
                className="inp-component"
                name="confirmPassword"
                type="string"
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <button className="change-password-button" type="submit">
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
