import React from 'react';

import { ReactComponent as SignUpLogo } from "../assets/spotter_register.svg";

import Form from "../components/Form";

const SignUp = () => {
  return (
    <Form action="Sign Up">
      <SignUpLogo data-testid="signup-img" className="form-logo"/>
    </Form>
  )
}

export default SignUp;