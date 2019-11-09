import React from "react";
import Routes from "../Routes";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("redirects and conditional rendering", () => {
  test("home path automatically renders `/` ", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    expect(history.location.pathname).toBe("/");
  });

  test("nav conditionally renders when logged out", () => {
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    expect(container.contains(getByText(/log in/i))).toBeTruthy();
    expect(container.contains(queryByText(/log out/i))).toBeFalsy();
    expect(container.contains(queryByText(/dashboard/i))).toBeFalsy();
  });

  test("nav conditionally renders when logged in", () => {
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    expect(container.contains(getByText(/log out/i))).toBeTruthy();
    expect(container.contains(getByText(/dashboard/i))).toBeTruthy();
    expect(container.contains(queryByText(/log in/i))).toBeFalsy();
    expect(container.contains(queryByText(/about/i))).toBeFalsy();
    expect(container.contains(queryByText(/contact/i))).toBeFalsy();
    localStorage.removeItem("token");
  });

  test("dashboard path pushes logged out users to login", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    history.push("/dashboard");
    expect(history.location.pathname).toEqual("/login");
  });

  test("home path pushes logged in users to dashboard", () => {
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    expect(history.location.pathname).toEqual("/dashboard")
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  })

  test("login path pushes logged in users to dashboard", () => {
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );
    history.push("/login");
    expect(history.location.pathname).toEqual("/dashboard")
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  })

  test("login path pushes logged in users to dashboard", () => {
    localStorage.setItem("token", "token");
    const history = createMemoryHistory();
    const { container, getByText, queryByText } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );
    history.push("/signup");
    expect(history.location.pathname).toEqual("/dashboard")
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  })

  test("404 page displays at bad route", () => {
    const history = createMemoryHistory();
    history.push("/badroutetest/badroute");
    const { container, getByTestId } = render(
      <Router history={history}>
        <Routes />
      </Router>
    );

    expect(container.innerHTML).toMatch(/404/i);
  });
});
