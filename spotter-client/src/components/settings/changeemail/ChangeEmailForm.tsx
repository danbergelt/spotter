import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { fetchToken } from '../../../types/State';
import ValidationSchema from './ValidationSchema';

const ChangeEmailForm: React.FC = () => {
  const t: string | null = useSelector(fetchToken);

  return (
    <section className='change-form'>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          oldEmail: '',
          newEmail: '',
          confirmEmail: ''
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm, setStatus }): Promise<void> => {
          resetForm();
          try {
            const res = await axiosWithAuth(t).put(
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
        {({ errors, touched, status }): JSX.Element => (
          <Form>
            <div className='change-inp'>
              <label htmlFor='oldEmail' className='change-label'>
                Old Email
              </label>
              <Field
                data-testid='old'
                className='inp-component'
                name='oldEmail'
              />
            </div>
            <div className='change-inp'>
              <label htmlFor='newEmail' className='change-label'>
                New Email
              </label>
              <Field
                data-testid='new'
                className='inp-component'
                name='newEmail'
              />
            </div>
            <div className='change-inp'>
              <label htmlFor='confirmEmail' className='change-label'>
                Confirm Email
              </label>
              <Field
                data-testid='confirm'
                className='inp-component'
                name='confirmEmail'
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
              {errors.confirmEmail && touched.confirmEmail && (
                <p className='change-err'>{errors.confirmEmail}</p>
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

export default ChangeEmailForm;
