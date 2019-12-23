import React from "react";
import { Formik, Form, Field } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { useSelector } from "react-redux";

const ChangePasswordForm = () => {
  const t = useSelector(state => state.globalReducer.t);
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
        onSubmit={async (values, { resetForm, setStatus }) => {
          resetForm();
          try {
            const res = await axiosWithAuth(t).put(
              `${process.env.REACT_APP_T_API}/api/auth/user/password`,
              {
                ...values
              }
            );
            setStatus(res.data);
          } catch (error) {
            setStatus(error.response.data);
          }
        }}
      >
        {({ errors, touched, status }) => (
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <button
                data-testid="save"
                className="change-password-button"
                type="submit"
              >
                Save
              </button>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="change-password-err">
                  {errors.confirmPassword}
                </div>
              )}
              {status && status.error && (
                <div className="change-password-err">{status.error}</div>
              )}
              {status && status.data && (
                <div className="change-password-succ">{status.data}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
