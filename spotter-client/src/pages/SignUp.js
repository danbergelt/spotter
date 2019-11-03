import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SignUpLogo } from "../assets/spotter_register.svg";
import Form from "../components/Form";

const SignUp = () => {
  const history = useHistory();

  return (
    <Form
      history={history}
      api={`${process.env.REACT_APP_T_API}/api/auth/register`}
      action="Sign Up"
    >
      <SignUpLogo
        data-testid="signup-img"
        role="img"
        aria-label="Animated image of people working out"
        className="form-logo"
      />
    </Form>
  );
};

export default SignUp;
