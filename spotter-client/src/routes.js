import React, { Profiler } from "react";
import { useToken } from "./hooks/useToken";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          {useToken() ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route path="/login">
          {useToken() ? <Redirect to="/dashboard" /> : <LogIn />}
        </Route>
        <Route path="/signup">
          {useToken() ? <Redirect to="/dashboard" /> : <SignUp />}
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/500" component={ServerError} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
