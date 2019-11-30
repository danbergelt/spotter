import React from "react";
import axios from "axios";
import { FETCH_WORKOUTS_SUCCESS } from "../../actions/fetchWorkoutsActions";
import WorkoutModal from "../../components/dash/workouts/WorkoutModal";
import WorkoutOptions from "../../components/dash/workoutmodal/options/WorkoutOptions";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import mockTemplateRes from "../../__testUtils__/mockTemplateRes";
import wrapper from "../../__testUtils__/wrapper";
import Modal from "react-modal";
import reducer from "../../reducers/index";

describe("from template functionality", () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement("div"));

  test("Can open and close from template modal", async () => {
    axios.get.mockResolvedValue({});

    const { getByText, queryByPlaceholderText, getByTestId } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    expect(queryByPlaceholderText(/search.../i)).toBeFalsy();
    fireEvent.click(getByText(/from template/i));
    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(queryByPlaceholderText(/search.../i)).toBeTruthy();
    fireEvent.click(getByTestId(/quit-from/i));
    expect(queryByPlaceholderText(/search.../i)).toBeFalsy();
  });

  test("can type in search bar", async () => {
    axios.get.mockResolvedValue(mockTemplateRes);
    const { getByPlaceholderText, container, getByText } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    fireEvent.click(getByText(/from template/i));

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const input = getByPlaceholderText(/search.../i);

    fireEvent.change(input, { target: { value: "testing input" } });

    expect(container.innerHTML).toMatch("testing input");
  });

  test("filter works", async () => {
    axios.get.mockResolvedValue(mockTemplateRes);
    const { getByPlaceholderText, container, getByText } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    fireEvent.click(getByText(/from template/i));

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(getByText(/test template/i)).toBeTruthy();

    fireEvent.change(getByPlaceholderText(/search.../i), {
      target: { value: "z" }
    });

    expect(getByText(/no templates found/i)).toBeTruthy();
  });

  test("can generate from template", async () => {
    axios.get.mockResolvedValue(mockTemplateRes);

    const Wrapper = props => {
      return <>{props.children}</>;
    };

    const { getByTestId, container, getByText, queryByText, store, debug } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: { exercises: [], tags: [] }
    });

    fireEvent.click(getByText(/from template/i));

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(getByText(/test template/i)).toBeTruthy();
    fireEvent.click(getByTestId(/generate-template/i));
    expect(queryByText(/workout for testing/i)).toBeFalsy();
    fireEvent.click(getByText(/test template/i));
    fireEvent.click(getByTestId(/generate-template/i));
    expect(container.innerHTML).toMatch("Workout FOR TESTING")
    expect(queryByText(/tag2/i)).toBeTruthy();
    expect(queryByText(/notes for workout/i)).toBeTruthy();
    expect(queryByText(/exercise2/i)).toBeTruthy();

  });
});
