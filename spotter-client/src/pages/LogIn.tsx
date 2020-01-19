import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { addTokenAction } from '../actions/globalActions';
import Form from '../components/auth/Form';
import { ReactComponent as LogInLogo } from '../assets/spotter_login.svg';

const LogIn: React.FC = () => {
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
        <title>Log In | Spotter</title>
      </Helmet>
      <Form
        history={history}
        api={`${process.env.REACT_APP_T_API}/api/auth/login`}
        action='Log In'
        addToken={addToken}
      >
        <LogInLogo
          data-testid='login-img'
          role='img'
          aria-label='Animated image of people working out'
          className='form-logo'
        />
      </Form>
    </>
  );
};

export default LogIn;
