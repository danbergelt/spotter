import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { fetchToken } from '../../types/State';

// unauthenticated route component
// this component accepts a token, verifies the token's contents, and either routes the accepted user to dashboard
// or sends them to the unauthenticated page

interface Props extends RouteProps {
  component: React.ComponentType<any>; // eslint-disable-line
  exact?: boolean;
  path: string;
}

const PublicRoute: React.FC<Props> = ({
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
            return <Redirect to='/dashboard' />;
          }
          return <Component {...props} />; // eslint-disable-line
        }}
      />
    </>
  );
};

export default PublicRoute;
