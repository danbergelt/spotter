import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { fetchToken } from 'src/types/State';
import { AxiosResponse } from 'axios';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { ValidationSchema } from './ValidationSchema';

const ChangePasswordForm: React.FC = () => {
  const t: string | null = useSelector(fetchToken);

  return (
    <section className='change-form'>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm, setStatus }) => {
          resetForm();
          try {
            const res: AxiosResponse<any> = await axiosWithAuth(t).put(
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
            <div className='change-inp'>
              <label className='change-label'>Old Password</label>
              <Field
                data-testid='old'
                className='inp-component'
                name='oldPassword'
                type='password'
              />
            </div>
            <div className='change-inp'>
              <label className='change-label'>New Password</label>
              <Field
                data-testid='new'
                className='inp-component'
                name='newPassword'
                type='password'
              />
            </div>
            <div className='change-inp'>
              <label className='change-label'>Confirm Password</label>
              <Field
                data-testid='confirm'
                className='inp-component'
                name='confirmPassword'
                type='password'
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <button
                data-testid='save'
                className='change-button'
                type='submit'
              >
                Save
              </button>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className='change-err'>{errors.confirmPassword}</p>
              )}
              {status?.error && <p className='change-err'>{status.error}</p>}
              {status?.data && <p className='change-succ'>{status.data}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ChangePasswordForm;
