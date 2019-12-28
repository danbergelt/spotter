import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Prs from "./pages/Prs";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import { useSelector } from "react-redux";
import { fetchToken } from "./types/State";

const Routes: React.FC = () => {
  const token: string | null = useSelector(fetchToken);

  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          {token ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route exact path="/login">
          {token ? <Redirect to="/dashboard" /> : <LogIn />}
        </Route>
        <Route exact path="/signup">
          {token ? <Redirect to="/dashboard" /> : <SignUp />}
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/prs" component={Prs} />
        <Route exact path="/500" component={ServerError} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
