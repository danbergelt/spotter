import React from "react";
import Login from "../../../pages/LogIn";
import axios from "axios";
import wrapper from "../../../__testUtils__/wrapper";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import { reducer } from "../../../reducers/index";
import ForgotPasswordInstructions from "src/components/auth/ForgotPassInstructions";
import { ADD_TOKEN } from "src/actions/addTokenActions";
import PublicRoute from "src/components/auth/PublicRoute";

describe("Forgot password instructions", () => {
  afterEach(cleanup);

  test("unauthenticated user passes through to protected component", async () => {
    const { history, container, queryByText } = wrapper(
      reducer,
      <PublicRoute component={ForgotPasswordInstructions} />
    );
    expect(queryByText(/forgot your password/i)).toBeTruthy();
  });

  test("authenticated redirects to dashboard", () => {
    axios.post.mockResolvedValue({});
    const { history, store, queryByText } = wrapper(
      reducer,
      <PublicRoute component={ForgotPasswordInstructions} />
    );

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    expect(queryByText(/forgot your password/i)).toBeFalsy();
  });
});
