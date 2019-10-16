import React from "react";
import Routes from "../routes";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("App routes", () => {
  test("Nav routes point to proper locations", () => {
    const history = createMemoryHistory();
    const { container, getByTestId } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    // home route
    expect(container.innerHTML).toMatch(/intuitive/i);

    // login page
    fireEvent.click(getByTestId(/login/i));
    expect(getByTestId(/login-img/i)).toBeTruthy();

    // signup page
    fireEvent.click(getByTestId(/signup/i));
    expect(getByTestId(/signup-img/i)).toBeTruthy();

    // back to home
    fireEvent.click(getByTestId(/spotter/i));
    expect(container.innerHTML).toMatch(/intuitive/i);
  });

  test("404 page displays at bad route", () => {
    const history = createMemoryHistory();
    history.push("/badroutetest/badroute");
    const { container, getByTestId } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    expect(container.innerHTML).toMatch(/404/i);

    // navigate away from 404
    fireEvent.click(getByTestId(/spotter/i));
    expect(container.innerHTML).toMatch(/intuitive/i);
  });
});
