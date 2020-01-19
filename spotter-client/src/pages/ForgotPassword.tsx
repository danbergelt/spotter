import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ForgotPasswordInstructions from '../components/auth/ForgotPassInstructions';
import ForgotAndChangePass from '../components/auth/ForgotAndChangePass';

const ForgotPassword: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Forgt Password | Spotter</title>
      </Helmet>
      {pathname === '/forgotpassword' ? (
        <ForgotPasswordInstructions />
      ) : (
        <ForgotAndChangePass />
      )}
    </>
  );
};

export default ForgotPassword;
