import React, { ReactNode, memo } from "react";
import { Form, Field, Formik, FormikActions } from "formik";
import axios, { AxiosResponse } from "axios";
import { History } from "history";
import { ValidationSchema } from "./ValidationSchema";

// component for login + signup forms

interface Props {
  action: string;
  api: string;
  history: History;
  children: ReactNode;
  addToken: (t: string) => void;
}

type FormValues = { email: string; password: string };

type FormActions = FormikActions<{ email: string; password: string }>;

const SpotterForm: React.FC<Props> = ({
  action,
  api,
  history,
  children,
  addToken
}) => {
  return (
    <div className="form-container">
      <div className="logo-container">
        <div>{children}</div>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={ValidationSchema}
        onSubmit={async (
          values: FormValues,
          { resetForm, setStatus }: FormActions
        ) => {
          try {
            const res: AxiosResponse<any> = await axios.post(api, values, {
              withCredentials: true
            });
            resetForm();
            addToken(res.data.token);
            history.push("/dashboard");
          } catch (error) {
            if (error.response) {
              setStatus(error.response.data.error);
            } else {
              history.push("/500");
            }
          }
        }}
      >
        {({ status, errors, touched }) => (
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
              {touched.email && errors.email && (
                <p className="form-error email">{errors.email}</p>
              )}
              <label className="form-label">Password</label>
              <Field
                className="form-field"
                name="password"
                placeholder="Password"
                type="password"
              />
              {touched.password && errors.password && (
                <p className="form-error pass">{errors.password}</p>
              )}
              <button
                data-testid="form-submit"
                className="form-button"
                type="submit"
              >
                {action}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default memo(SpotterForm);