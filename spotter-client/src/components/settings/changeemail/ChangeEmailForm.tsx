import React from "react";
import { Formik, Form, Field } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import { AxiosResponse } from "axios";
import axiosWithAuth from "src/utils/axiosWithAuth";
import { useSelector } from "react-redux";
import { fetchToken } from "src/types/State";

const ChangeEmailForm: React.FC = () => {
  const t: string | null = useSelector(fetchToken);

  return (
    <div className="change-form">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          oldEmail: "",
          newEmail: "",
          confirmEmail: ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm, setStatus }) => {
          resetForm();
          try {
            const res: AxiosResponse<any> = await axiosWithAuth(t).put(
              `${process.env.REACT_APP_T_API}/api/auth/user/email`,
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
            <div className="change-inp">
              <label className="change-label">Old Email</label>
              <Field
                data-testid="old"
                className="inp-component"
                name="oldEmail"
              />
            </div>
            <div className="change-inp">
              <label className="change-label">New Email</label>
              <Field
                data-testid="new"
                className="inp-component"
                name="newEmail"
              />
            </div>
            <div className="change-inp">
              <label className="change-label">Confirm Email</label>
              <Field
                data-testid="confirm"
                className="inp-component"
                name="confirmEmail"
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
              {errors.confirmEmail && touched.confirmEmail && (
                <div className="change-err">{errors.confirmEmail}</div>
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
