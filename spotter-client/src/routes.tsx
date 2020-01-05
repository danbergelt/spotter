import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import Prs from "./pages/Prs";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import { useSelector } from "react-redux";
import { fetchToken } from "./types/State";

// component contains routes and handles routing authenticated users to various parts of app

const Routes: React.FC = () => {
  const token: string | null = useSelector(fetchToken);

  // helper function that automatically redirects user to dashboard when token is present
  const redirect = (Component: React.FC): JSX.Element => {
    return token ? <Redirect to="/dashboard" /> : <Component />;
  };

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          {redirect(Home)}
        </Route>
        <Route path="/login">
          {redirect(LogIn)}
        </Route>
        <Route path="/signup">
          {redirect(SignUp)}
        </Route>
        <Route path="/forgotpassword">
          {redirect(ForgotPassword)}
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/prs" component={Prs} />
        {/* routes users to a basic 500 page for unhandled errors (such as server being down, etc) */}
        <Route path="/500" component={ServerError} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
