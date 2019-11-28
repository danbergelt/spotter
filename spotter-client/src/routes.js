import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import { connect } from "react-redux";

const Routes = ({ token }) => {

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
        <Route exact path="/500" component={ServerError} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    token: state.tokenReducer.t
  };
};

export default connect(mapStateToProps, {})(Routes);
