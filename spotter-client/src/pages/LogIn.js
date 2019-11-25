import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as LogInLogo } from "../assets/spotter_login.svg";
import Form from "../components/auth/Form";
import { connect } from 'react-redux';
import { addToken } from '../actions/addTokenActions';

const LogIn = ({ addToken }) => {
  const history = useHistory();

  return (
    <Form
      history={history}
      api={`${process.env.REACT_APP_T_API}/api/auth/login`}
      action="Log In"
      addToken={addToken}
    >
      <LogInLogo
        data-testid="login-img"
        role="img"
        aria-label="Animated image of people working out"
        className="form-logo"
      />
    </Form>
  );
};

export default connect(null, { addToken })(LogIn);

