import React from "react";
import Routes from "../routes";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { cleanup, fireEvent } from "@testing-library/react";
import wrapper from "../__testUtils__/wrapper";
import secureStorage from "../utils/secureToken";
import mockWorkoutRes from "../__testUtils__/mockWorkoutRes";
import axios from "axios";
import reducer from "../reducers/index.js";

describe("Weekly dash date settings", () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  it("can go back in time", () => {
    const moment = extendMoment(Moment);
    secureStorage.setItem(`${process.env.REACT_APP_KEY}`, "token");
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { container, getByText, getByTestId, queryByText, history } = wrapper(
      reducer,
      <Routes />
    );

    history.push("/dashboard");

    expect(container.contains(getByText(/week/i))).toBeTruthy();
    expect(
      container.contains(
        getByText(
          moment()
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/back/i));

    expect(
      container.contains(
        getByText(
          moment()
            .add(-1, "weeks")
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByText(
          moment()
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByText(
          moment()
            .add(-2, "weeks")
            .startOf("week")
            .format("MMM DD")
        )
      )
    ).toBeFalsy();

    expect(axios.post).toHaveBeenCalledTimes(2);
  });

  it("can go forward in time", () => {
    const moment = extendMoment(Moment);
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { container, getByText, getByTestId, queryByText, history } = wrapper(
      reducer,
      <Routes />
    );

    history.push("/dashboard");

    expect(container.contains(getByText(/week/i))).toBeTruthy();
    expect(
      container.contains(
        getByText(
          moment()
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/forward/i));

    expect(
      container.contains(
        getByText(
          moment()
            .add(1, "weeks")
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByText(
          moment()
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByText(
          moment()
            .add(2, "weeks")
            .startOf("week")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();

    expect(axios.post).toHaveBeenCalledTimes(2);
  });
});
