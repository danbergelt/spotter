import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SignUpLogo } from "../assets/spotter_register.svg";
import Form from "../components/auth/Form";
import { connect } from "react-redux";
import { addToken } from "../actions/addTokenActions";

const SignUp = ({ addToken }) => {
  const history = useHistory();

  return (
    <Form
      history={history}
      api={`${process.env.REACT_APP_T_API}/api/auth/register`}
      action="Sign Up"
      addToken={addToken}
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

export default connect(null, { addToken })(SignUp);
