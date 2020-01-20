import React, { useMemo } from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { fetchToken } from '../../types/State';

// authenticated route component
// this component accepts a token, verifies the token's contents, and either accepts the user or redirects them to log in

interface Props extends RouteProps {
  component: React.ComponentType<any>; // eslint-disable-line
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}: Props): JSX.Element => {
  const token: string | null = useSelector(useMemo(() => fetchToken, []));

  return (
    <>
      <Route
        {...rest} // eslint-disable-line
        render={(props): JSX.Element => {
          if (token) {
            return <Component {...props} />; // eslint-disable-line
          }
          return <Redirect to='/login' />;
        }}
      />
    </>
  );
};

export default PrivateRoute;
