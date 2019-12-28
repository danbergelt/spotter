import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as SignUpLogo } from "../assets/spotter_register.svg";
import Form from "../components/auth/Form";
import { useDispatch } from "react-redux";
import { ADD_TOKEN } from "../actions/addTokenActions";

const SignUp: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const addToken = useCallback(
    (t: string): void => {
      dispatch<{ type: string; payload: string }>({
        type: ADD_TOKEN,
        payload: t
      });
    },
    [dispatch]
  );

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

export default SignUp;
