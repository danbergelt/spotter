import React from "react";
import SignUp from "../pages/SignUp";
import axios from "axios";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

afterEach(cleanup);

describe("Register validation", () => {
  test("register page renders with empty inputs", () => {
    const history = createMemoryHistory();
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);

    expect(email.getAttribute("value")).toBe("");
    expect(password.getAttribute("value")).toBe("");
  });

  test("fields can be typed in", () => {
    const history = createMemoryHistory();
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);

    fireEvent.change(email, {
      target: { value: "test@input.com" }
    });

    fireEvent.change(password, {
      target: { value: "testinginputs" }
    });

    expect(email.getAttribute("value")).toBe("test@input.com");
    expect(password.getAttribute("value")).toBe("testinginputs");
  });

  test("register page renders yup vals on touched fields", async () => {
    const history = createMemoryHistory();
    const { container, getByPlaceholderText, findByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    const email = getByPlaceholderText(/name@email.com/i);
    const password = getByPlaceholderText(/password/i);

    fireEvent.focus(email);
    fireEvent.blur(email);

    const eVal = await findByText(/email is required/i);
    expect(container.contains(eVal)).toBeTruthy();

    fireEvent.focus(password);
    fireEvent.blur(password);

    const pVal = await findByText(/password is required/i);
    expect(container.contains(pVal)).toBeTruthy();
  });

  test("register attempt with invalid credentials", async () => {
    // mock err response
    axios.post.mockRejectedValue({
      response: { data: { error: "Test reject" } }
    });

    const history = createMemoryHistory();
    const { container, getByPlaceholderText, findByText, getByTestId } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: "bademail@email.com" }
    });

    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: "badpassword" }
    });

    fireEvent.click(getByTestId(/form-submit/i));

    const apiVal = await findByText(/test reject/i);

    expect(container.contains(apiVal)).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    axios.post.mockClear();
  });

  test("successful registration", async () => {
    axios.post.mockResolvedValue({
      data: { token: "test-token" }
    });

    const history = createMemoryHistory();
    const { getByPlaceholderText, getByTestId } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    fireEvent.change(getByPlaceholderText(/name@email.com/i), {
      target: { value: "goodemail@email.com" }
    });

    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: "goodpassword" }
    });

    fireEvent.click(getByTestId(/form-submit/i));

    await wait(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem("token")).toEqual("test-token");
      expect(history.location.pathname).toEqual("/dashboard");
    });
  });
});
