import React from "react";
import Routes from "../Routes";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";
import secureStorage from "../utils/secureToken";

const store = createStore(reducer, applyMiddleware(thunk));

afterEach(cleanup);

describe("redirects and conditional rendering", () => {
  test("home path automatically renders `/` ", () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    expect(history.location.pathname).toBe("/");
  });

  test("nav conditionally renders when logged out", () => {
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    expect(container.contains(getByText(/log in/i))).toBeTruthy();
    expect(container.contains(queryByText(/log out/i))).toBeFalsy();
    expect(container.contains(queryByText(/dashboard/i))).toBeFalsy();
  });

  test("nav conditionally renders when logged in", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    expect(container.contains(getByText(/log out/i))).toBeTruthy();
    expect(container.contains(getByText(/dashboard/i))).toBeTruthy();
    expect(container.contains(queryByText(/log in/i))).toBeFalsy();
    expect(container.contains(queryByText(/about/i))).toBeFalsy();
    expect(container.contains(queryByText(/contact/i))).toBeFalsy();
    secureStorage.removeItem(`${process.env.REACT_APP_KEY}`);
  });

  test("dashboard path pushes logged out users to login", () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    history.push("/dashboard");
    expect(history.location.pathname).toEqual("/login");
  });

  test("home path pushes logged in users to dashboard", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    expect(history.location.pathname).toEqual("/dashboard");
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  });

  test("login path pushes logged in users to dashboard", () => {
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    history.push("/login");
    expect(history.location.pathname).toEqual("/dashboard");
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  });

  test("signup path pushes logged in users to dashboard", () => {
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    history.push("/signup");
    expect(history.location.pathname).toEqual("/dashboard");
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  });

  test("404 page displays at bad route", () => {
    const history = createMemoryHistory();
    history.push("/badroutetest/badroute");
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    expect(container.innerHTML).toMatch(/404/i);
  });
});
