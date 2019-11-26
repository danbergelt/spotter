import React from "react";
import Routes from "../../routes";
import { fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../__testUtils__/wrapper";
import axios from "axios";
import mockWorkoutRes from "../../__testUtils__/mockWorkoutRes";
import reducer from "../../reducers/index";
import { ADD_TOKEN } from '../../actions/addTokenActions';

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
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { getByText, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    fireEvent.click(getByText(/dashboard/i));
    expect(history.location.pathname).toEqual("/dashboard");
    expect(axios.post).toHaveBeenCalledTimes(1);
    
  });

  test("logout functionality works", () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { getByTestId, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    fireEvent.click(getByTestId(/logout/i));
    expect(history.location.pathname).toEqual("/login");
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
