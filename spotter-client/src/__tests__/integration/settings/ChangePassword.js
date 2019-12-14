import React from "react";
import Settings from "../../../pages/Settings";
import { fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../../__testUtils__/wrapper";
import { reducer } from "../../../reducers/index";
import { ADD_TOKEN } from "../../../actions/addTokenActions";

describe("Nav routes", () => {
  afterEach(cleanup);

  test("can open change password popover", () => {
    const { queryByText, getByText, store } = wrapper(reducer, <Settings />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    expect(queryByText(/confirm password/i)).toBeFalsy();

    fireEvent.click(getByText(/change password.../i));

    expect(queryByText(/confirm password/i)).toBeTruthy();
  });

  test("can open ")
});
