import React from "react";

import { Route, Redirect } from "react-router-dom";

import secureStorage from './secureToken';

import { connect } from 'react-redux';

const PrivateRoute = ({ token, component: Component, ...rest }) => {
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

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.t
  }
}

export default connect(mapStateToProps, null)(PrivateRoute);
