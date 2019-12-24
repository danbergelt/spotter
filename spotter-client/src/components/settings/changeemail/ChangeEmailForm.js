import React from "react";
import { Formik, Form, Field } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { useSelector } from "react-redux";

const ChangeEmailForm = () => {
  const t = useSelector(state => state.globalReducer.t);
  return (
    <div className="change-form">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm, setStatus }) => {
          resetForm();
          console.log(values)
        }}
      >
        {({ errors, touched, status }) => (
          <Form>
            <div className="change-inp">
              <label className="change-label">Old Email</label>
              <Field
                data-testid="old"
                className="inp-component"
                name="oldPassword"
              />
            </div>
            <div className="change-inp">
              <label className="change-label">New Email</label>
              <Field
                data-testid="new"
                className="inp-component"
                name="newPassword"
              />
            </div>
            <div className="change-inp">
              <label className="change-label">Confirm Email</label>
              <Field
                data-testid="confirm"
                className="inp-component"
                name="confirmPassword"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <button
                data-testid="save"
                className="change-button"
                type="submit"
              >
                Save
              </button>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="change-err">
                  {errors.confirmPassword}
                </div>
              )}
              {status && status.error && (
                <div className="change-err">{status.error}</div>
              )}
              {status && status.data && (
                <div className="change-succ">{status.data}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeEmailForm;