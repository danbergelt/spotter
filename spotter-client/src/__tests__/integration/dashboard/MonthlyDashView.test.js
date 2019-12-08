import React from "react";
import Routes from "../../../routes";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { cleanup, fireEvent } from "@testing-library/react";
import wrapper from "../../../__testUtils__/wrapper";
import mockWorkoutRes from "../../../__testUtils__/mockWorkoutRes";
import axios from "axios";
import reducer from "../../../reducers/index.js";
import { SET_SCOPE } from '../../../actions/timeScopeActions';
import { ADD_TOKEN } from "../../../actions/addTokenActions";

describe("Weekly dash date settings", () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  const moment = extendMoment(Moment);

  it("can go back in time", () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByText,
      history,
      store
    } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });
    store.dispatch({
      type: SET_SCOPE,
      payload: { value: "Month", label: "Month" }
    });

    history.push("/dashboard");

    expect(container.contains(getByText(/month/i))).toBeTruthy();
    
    expect(
      container.contains(
        getByText(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/back/i));

    expect(
      container.contains(
        getByText(
          moment()
            .add(-1, "months")
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByText(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByText(
          moment()
            .add(-2, "months")
            .startOf("monnth")
            .format("MMM DD")
        )
      )
    ).toBeFalsy();
  });

  it("can go forward in time", () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByText,
      history,
      store
    } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });
    store.dispatch({
      type: SET_SCOPE,
      payload: { value: "Month", label: "Month" }
    });

    history.push("/dashboard");

    expect(container.contains(getByText(/month/i))).toBeTruthy();
    expect(
      container.contains(
        getByText(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/forward/i));

    expect(
      container.contains(
        getByText(
          moment()
            .add(1, "months")
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByText(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByText(
          moment()
            .add(2, "months")
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
  });
});
