import React, { useMemo } from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";

import { useSelector } from "react-redux";
import { fetchToken } from "src/types/State";

// authenticated route component

interface Props extends RouteProps{
  component: React.ComponentType<any>;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }): JSX.Element => {

  const token: string | null = useSelector(useMemo(() => fetchToken, []));

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
