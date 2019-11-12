import React from "react";
import Routes from "../routes";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index";

const store = createStore(reducer, applyMiddleware(thunk));

describe("Nav routes", () => {
  test("Nav routes point to proper locations", () => {
    const history = createMemoryHistory();
    const { container, getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    // home route
    expect(container.innerHTML).toMatch(/tracker/i);

    // login page
    fireEvent.click(getByTestId(/login/i));
    expect(getByTestId(/login-img/i)).toBeTruthy();

    // signup page
    fireEvent.click(getByTestId(/signup/i));
    expect(getByTestId(/signup-img/i)).toBeTruthy();

    // back to home
    fireEvent.click(getByTestId(/spotter/i));
    expect(container.innerHTML).toMatch(/tracker/i);
  });

  test("dashboard link works for logged-in users", () => {
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );

    fireEvent.click(getByText(/dashboard/i));
    expect(history.location.pathname).toEqual("/dashboard");
    localStorage.removeItem("token");
  });

  test("logout functionality works", () => {
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    fireEvent.click(getByTestId(/logout/i));
    expect(localStorage.getItem("token")).toEqual(null);
    expect(history.location.pathname).toEqual("/login");
  });
});
