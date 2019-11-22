import React from "react";
import Routes from "../../routes";
import { fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../__testUtils__/wrapper";
import secureStorage from "../../utils/secureToken";
import axios from "axios";
import mockWorkoutRes from "../../__testUtils__/mockWorkoutRes";
import reducer from "../../reducers/index";

describe("Nav routes", () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  test("Nav routes point to proper locations", () => {
    const { container, getByTestId } = wrapper(reducer, <Routes />);

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
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { getByText, history } = wrapper(reducer, <Routes />);

    fireEvent.click(getByText(/dashboard/i));
    expect(history.location.pathname).toEqual("/dashboard");
    expect(axios.post).toHaveBeenCalledTimes(1);
    
  });

  test("logout functionality works", () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { getByTestId, history } = wrapper(reducer, <Routes />);

    fireEvent.click(getByTestId(/logout/i));
    expect(secureStorage.getItem(`${process.env.REACT_APP_KEY}`)).toEqual(null);
    expect(history.location.pathname).toEqual("/login");
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
