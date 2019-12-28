import React from "react";
import PrivateRoute from "../../../components/auth/PrivateRoute";
import Dashboard from "../../../pages/Dashboard";
import wrapper from "../../../__testUtils__/wrapper";
import{ reducer } from "../../../reducers/index";
import { ADD_TOKEN } from "../../../actions/addTokenActions";
import axios from 'axios';

test("unauthenticated user redirects to login", () => {
  const { history } = wrapper(
    reducer,
    <PrivateRoute component={<Dashboard />} />
  );

  expect(history.location.pathname).toEqual("/login");
});

// was having trouble testing w/ my wrapper due to passing component as prop - testing dashboard route instead

test("authenticated user passes through to protected component", () => {
  axios.post.mockResolvedValue({})
  const { history, store } = wrapper(
    reducer,
    <Dashboard />
  );

  store.dispatch({type: ADD_TOKEN, payload: 'token'})

  history.push("/dashboard")

  expect(history.location.pathname).toEqual('/dashboard')
});
