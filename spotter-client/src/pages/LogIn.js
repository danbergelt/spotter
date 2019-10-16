import React from "react";

import { ReactComponent as LogInLogo } from "../assets/spotter_login.svg";

import Form from "../components/Form";

const LogIn = () => {
  return (
    <Form action="Log In">
      <LogInLogo data-testid="login-img" className="form-logo"/>
    </Form>
  );
};

export default LogIn;
