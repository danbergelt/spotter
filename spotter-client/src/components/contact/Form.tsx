import React from 'react';
import { Form as Wrapper, Field, Formik } from 'formik';
import { ValidationSchema } from './ValidationSchema';

const Form: React.FC = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', subject: '', message: '' }}
      validationSchema={ValidationSchema}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        console.log(values);
      }}
    >
      {({ status, errors, touched, setFieldValue, values, handleBlur }) => (
        <Wrapper>
          {status && <p className='api-err-box'>{status}</p>}
          <div className='contact-form-fields-container'>
            <div className='form-label-container'>
              <label className='contact-form-label' htmlFor='name'>
                Name
              </label>
              {touched.name && errors.name && (
                <p className='form-error'>{errors.name}</p>
              )}
            </div>
            <Field
              placeholder='Jane Doe'
              className='contact-form-field'
              type='text'
              name='name'
            />
            <div className='form-label-container'>
              <label className='contact-form-label' htmlFor='email'>
                Email
              </label>
              {touched.email && errors.email && (
                <p className='form-error'>{errors.email}</p>
              )}
            </div>
            <Field
              placeholder='name@email.com'
              className='contact-form-field'
              type='email'
              name='email'
            />
            <div className='form-label-container'>
              <label className='contact-form-label' htmlFor='subject'>
                Subject
              </label>
              {touched.subject && errors.subject && (
                <p className='form-error'>{errors.subject}</p>
              )}
            </div>
            <Field
              placeholder='e.g. feature request'
              className='contact-form-field'
              type='text'
              name='subject'
            />
            <div className='form-label-container'>
              <label className='contact-form-label' htmlFor='message'>
                Message
              </label>
              {touched.message && errors.message && (
                <p className='form-error'>{errors.message}</p>
              )}
            </div>
            <textarea
              name='message'
              onBlur={handleBlur}
              value={values.message}
              onChange={e => setFieldValue('message', e.target.value)}
              placeholder='Your message goes here...'
              className='contact-form-message'
            />
            <button className='contact-form-button' type='submit'>
              Submit
            </button>
          </div>
        </Wrapper>
      )}
    </Formik>
  );
};

export default Form;
