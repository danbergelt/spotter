import React from "react";

import { Route, Redirect } from "react-router-dom";

import secureStorage from './secureToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={props => {
          if (secureStorage.getItem(`${process.env.REACT_APP_KEY}`)) {
            return <Component {...props} />;
          }
          return <Redirect to="/login" />;
        }}
      />
    </>
  );
};

export default PrivateRoute;
