import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useSelector } from 'react-redux';

// authenticated route component

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(state => state.globalReducer.t)
  
  return (
    <>
      <Route
        {...rest}
        render={props => {
          if (token) {
            return <Component {...props} />;
          }
          return <Redirect to="/login" />;
        }}
      />
    </>
  );
};

export default PrivateRoute;
