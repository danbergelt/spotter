import React from "react";
import Routes from "../../../routes";
import Prs from "../../../pages/Prs";
import { fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../../__testUtils__/wrapper";
import { reducer } from "../../../reducers/index";
import axios from "axios";
import { ADD_TOKEN } from "../../../actions/addTokenActions";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { FETCH_PRS_SUCCESS } from "../../../actions/prActions";

const moment = extendMoment(Moment);

describe("Prs page functionality", () => {
  afterEach(cleanup);

  test("can navigate to prs page", () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({});
    const { getByText, history, store } = wrapper(reducer, <Routes />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    fireEvent.click(getByText(/personal bests/i));
    expect(history.location.pathname).toEqual("/prs");
  });

  test("displays pr", () => {
    axios.get.mockResolvedValue({});
    const { getByText, queryByText, store } = wrapper(reducer, <Prs />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    store.dispatch({
      type: FETCH_PRS_SUCCESS,
      payload: {
        squat: { name: "squat", date: moment().format("MMM DD YYYY") },
        deadlift: {
          name: "deadlift",
          date: moment()
            .subtract(2, "months")
            .format("MMM DD YYYY")
        },
        bench: {
          name: "bench",
          date: moment()
            .subtract(2, "years")
            .format("MMM DD YYYY")
        }
      }
    });

    expect(queryByText(/squat/i)).toBeFalsy();

    fireEvent.click(getByText(/last month/i));

    expect(getByText(/squat/i)).toBeTruthy();

    expect(queryByText(/deadlift/i)).toBeFalsy();

    fireEvent.click(getByText(/last year/i));

    expect(getByText(/deadlift/i)).toBeTruthy();

    expect(queryByText(/bench/i)).toBeFalsy();

    fireEvent.click(getByText(/all time/i));

    expect(getByText(/bench/i)).toBeTruthy();
  });

  test("displays no range found", () => {
    axios.get.mockResolvedValue({});
    const { getByText, store } = wrapper(reducer, <Prs />);

    store.dispatch({ type: ADD_TOKEN, payload: "token" });

    fireEvent.click(getByText(/last month/i));

    expect(getByText(/no prs found in this range/i)).toBeTruthy();
  });
});
