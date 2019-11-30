import React from "react";
import axios from "axios";
import { FROM_TEMPLATE } from "../../actions/workoutActions";
import WorkoutModal from "../../components/dash/workouts/WorkoutModal";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import mockTemplateRes from "../../__testUtils__/mockTemplateRes";
import wrapper from "../../__testUtils__/wrapper";
import Modal from "react-modal";
import reducer from "../../reducers/index";

describe("exercise actions", () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement("div"));

  it("can delete exercise", () => {
    const { container, getAllByTestId, queryByText, getByText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    store.dispatch({ type: FROM_TEMPLATE, payload: mockTemplateRes.data.templates[0] });

    expect(getByText(/exercise2/i)).toBeTruthy();

    fireEvent.click(getAllByTestId(/del-ex/i)[1]);

    expect(queryByText(/exercise2/i)).toBeFalsy();
  });
});
