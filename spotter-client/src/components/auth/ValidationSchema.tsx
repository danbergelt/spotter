import * as Yup from 'yup';

// validation schema for Auth form (log in / sign up) - built using Formik and Yup
const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

export default ValidationSchema;
