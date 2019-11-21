import React from "react";
import wrapper from "../__testUtils__/wrapper";
import Routes from "../Routes";
import { cleanup } from "@testing-library/react";
import axios from "axios";
import secureStorage from "../utils/secureToken";
import mockWorkoutRes from "../__testUtils__/mockWorkoutRes";
import reducer from '../reducers/index';

describe("redirects and conditional rendering", () => {
  afterEach(cleanup);

  test("home path automatically renders `/` ", () => {
    const { history } = wrapper(reducer, <Routes />);

    expect(history.location.pathname).toBe("/");
  });

  test("nav conditionally renders when logged out", () => {
    const { container, getByText, queryByText } = wrapper(reducer, <Routes />);

    expect(container.contains(getByText(/log in/i))).toBeTruthy();
    expect(container.contains(queryByText(/log out/i))).toBeFalsy();
    expect(container.contains(queryByText(/dashboard/i))).toBeFalsy();
  });

  test("nav conditionally renders when logged in", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
    axios.post.mockResolvedValue(mockWorkoutRes);

    const { container, getByText, queryByText } = wrapper(reducer, <Routes />);

    expect(container.contains(getByText(/log out/i))).toBeTruthy();
    expect(container.contains(getByText(/dashboard/i))).toBeTruthy();
    expect(container.contains(queryByText(/log in/i))).toBeFalsy();
    expect(container.contains(queryByText(/about/i))).toBeFalsy();
    expect(container.contains(queryByText(/contact/i))).toBeFalsy();
    expect(axios.post).toHaveBeenCalledTimes(1)
    secureStorage.removeItem(`${process.env.REACT_APP_KEY}`);
  });

  test("dashboard path pushes logged out users to login", () => {
    const { history } = wrapper(reducer, <Routes />);

    history.push("/dashboard");
    expect(history.location.pathname).toEqual("/login");
  });

  test("home path pushes logged in users to dashboard", () => {
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
    const { container, getByText, history } = wrapper(reducer, <Routes />);

    expect(history.location.pathname).toEqual("/dashboard");
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  });

  test("login path pushes logged in users to dashboard", () => {
    const { container, getByText, history } = wrapper(reducer, <Routes />);

    history.push("/login");
    expect(history.location.pathname).toEqual("/dashboard");
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  });

  test("signup path pushes logged in users to dashboard", () => {
    const { container, getByText, history } = wrapper(reducer, <Routes />);

    history.push("/signup");
    expect(history.location.pathname).toEqual("/dashboard");
    expect(container.contains(getByText(/view prs/i))).toBeTruthy();
  });

  test("404 page displays at bad route", () => {
    const { container, history } = wrapper(reducer, <Routes />);
    history.push("/badroutetest/badroute");

    expect(container.innerHTML).toMatch(/404/i);
  });
});
