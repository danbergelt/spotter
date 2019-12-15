import React from "react";
import Routes from "../../../routes";
import { fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../../__testUtils__/wrapper";
import { reducer } from "../../../reducers/index";
import axios from "axios";
import { ADD_TOKEN } from "../../../actions/addTokenActions";

describe("Prs page functionality", () => {
  afterEach(cleanup);

  test("can navigate to prs page", () => {
    axios.post.mockResolvedValue({});
    const { getByText, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    fireEvent.click(getByText(/personal bests/i));
    expect(history.location.pathname).toEqual("/prs");
  });
});
