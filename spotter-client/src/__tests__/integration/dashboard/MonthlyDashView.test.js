import React from "react";
import Routes from "../../../routes";
import WorkoutGrid from "../../../components/dash/workouts/WorkoutGrid";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { cleanup, fireEvent } from "@testing-library/react";
import wrapper from "../../../__testUtils__/wrapper";
import mockWorkoutRes from "../../../__testUtils__/mockWorkoutRes";
import axios from "axios";
import Modal from "react-modal";
import reducer from "../../../reducers/index.js";
import { SET_SCOPE } from "../../../actions/timeScopeActions";
import { ADD_TOKEN } from "../../../actions/addTokenActions";
import { FETCH_WORKOUTS_SUCCESS } from "../../../actions/fetchWorkoutsActions";

describe("Weekly dash date settings", () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement("div"));

  const moment = extendMoment(Moment);

  it("can go back in time", () => {
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      container,
      getByText,
      getByTestId,
      queryByTestId,
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
        queryByTestId(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/back/i));

    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(-1, "months")
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(-2, "months")
            .startOf("month")
            .format("MMM DD YYYY")
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
      queryByTestId,
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
        queryByTestId(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();

    fireEvent.click(getByTestId(/forward/i));

    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(1, "months")
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeTruthy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
    expect(
      container.contains(
        queryByTestId(
          moment()
            .add(2, "months")
            .startOf("month")
            .format("MMM DD YYYY")
        )
      )
    ).toBeFalsy();
  });

  it("fetches workouts and displays them", async () => {
    axios.post.mockResolvedValue({})
    const { queryByText, store } = wrapper(reducer, <WorkoutGrid />);

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    expect(queryByText(/workout for testing/i)).toBeTruthy();
  });

  it("opens add workout modal", () => {
    axios.post.mockResolvedValue({})
    const { store, getByTestId } = wrapper(reducer, <WorkoutGrid />);

    fireEvent.click(getByTestId(/add-for-testing/i));

    expect(store.getState().globalReducer.ctx).toEqual("add");
  });

  it("opens view workout modal", () => {
    axios.post.mockResolvedValue({})
    const { store, getByText } = wrapper(reducer, <WorkoutGrid />);

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    fireEvent.click(getByText(/workout for testing/i));

    expect(store.getState().globalReducer.ctx).toEqual("view");
  });
});
