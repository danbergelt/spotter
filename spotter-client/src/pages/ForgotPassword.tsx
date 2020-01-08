import React from "react";
import { useLocation } from "react-router-dom";
import ForgotPasswordInstructions from "src/components/auth/ForgotPassInstructions";
import ForgotAndChangePass from "src/components/auth/ForgotAndChangePass";

const ForgotPassword: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/forgotpassword" ? (
        <ForgotPasswordInstructions />
      ) : (
        <ForgotAndChangePass />
      )}
    </>
  );
};

export default ForgotPassword;
