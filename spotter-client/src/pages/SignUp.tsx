import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { addTokenAction } from '../actions/globalActions';
import Form from '../components/auth/Form';
import { ReactComponent as SignUpLogo } from '../assets/spotter_register.svg';

const SignUp: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const addToken = useCallback(
    (t: string): void => {
      dispatch(addTokenAction(t));
    },
    [dispatch]
  );

  return (
    <>
      <Helmet>
        <title>Sign Up | Spotter</title>
      </Helmet>
      <Form
        history={history}
        api={`${process.env.REACT_APP_T_API}/api/auth/register`}
        action='Sign Up'
        addToken={addToken}
      >
        <SignUpLogo
          data-testid='signup-img'
          role='img'
          aria-label='Animated image of people working out'
          className='form-logo'
        />
      </Form>
    </>
  );
};

export default SignUp;
