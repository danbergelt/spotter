import React from "react";
import WorkoutColumns from "../../components/dash/workouts/WorkoutColumns";
import TagsModal from "../../components/dash/workoutmodal/tagsmodal/TagsModal";
import { cleanup, fireEvent } from "@testing-library/react";
import wrapper from "../../__testUtils__/wrapper";
import Modal from "react-modal";
import axios from "axios";
import mockWorkoutRes from "../../__testUtils__/mockWorkoutRes";
import reducer from "../../reducers/index";

describe("tag modal functionalty", () => {
  afterEach(cleanup);
  Modal.setAppElement(document.createElement("div"));

  test("open and close tag modal functionality", () => {
    console.error = jest.fn();
    axios.post.mockResolvedValue(mockWorkoutRes);
    const { queryByPlaceholderText, getByTestId, queryByTestId } = wrapper(
      reducer,
      <WorkoutColumns />
    );

    fireEvent.click(getByTestId(/modal-click/i));

    expect(queryByPlaceholderText(/e.g. squat/i)).toBeTruthy();
    expect(queryByTestId(/exit-modal/i)).toBeTruthy();

    fireEvent.click(getByTestId(/tags-modal/i));

    expect(queryByTestId(/tags-modal-head/i)).toBeTruthy();

    fireEvent.click(getByTestId(/close-tag-modal/i));

    expect(queryByTestId(/tags-modal-head/i)).toBeFalsy();
  });

  test("can switch between tabs", () => {
    const { queryByPlaceholderText, getByText, queryByText } = wrapper(
      reducer,
      <TagsModal modal={true} />
    );

    expect(queryByPlaceholderText(/set tag name.../i)).toBeFalsy();
    expect(queryByText(/create tag/i)).toBeFalsy();

    fireEvent.click(getByText(/create/i));

    expect(queryByPlaceholderText(/set tag name.../i)).toBeTruthy();
    expect(queryByText(/create tag/i)).toBeTruthy();
  });

  test("can set tag name", () => {
    const { getByPlaceholderText, getByText, container } = wrapper(
      reducer,
      <TagsModal modal={true} />
    );

    fireEvent.click(getByText(/create/i));
    const title = getByPlaceholderText(/set tag name.../i);
    fireEvent.change(title, { target: { value: "test title" } });
    expect(container.innerHTML).toMatch(/test title/i);
  });

  test("can pick color", () => {
    const { getAllByLabelText, getByText, getByTestId } = wrapper(
      reducer,
      <TagsModal modal={true} />
    );

    fireEvent.click(getByText(/create/i));

    const colors = getAllByLabelText(/tag-colors/i);

    expect(getByTestId(/selected-tag/i)).toEqual(colors[0]);

    fireEvent.click(colors[1]);

    expect(getByTestId(/selected-tag/i)).toEqual(colors[1]);
  });

  test("can create tag", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });
    const { getAllByLabelText, getByText, findByText, container } = wrapper(
      reducer,
      <TagsModal modal={true} />
    );

    fireEvent.click(getByText(/create/i));

    const colors = getAllByLabelText(/tag-colors/i);
    fireEvent.click(colors[1]);
    fireEvent.click(getByText(/create tag/i));

    const succ = await findByText(/new tag created/i);

    expect(container.contains(succ)).toBeTruthy();
  });

  test("error message displays on rejected value", async () => {
    axios.post.mockRejectedValue({ response: { data: { error: "Rejected" } } });
    const { getAllByLabelText, getByText, findByText, container } = wrapper(
      reducer,
      <TagsModal modal={true} />
    );

    fireEvent.click(getByText(/create/i));

    const colors = getAllByLabelText(/tag-colors/i);
    fireEvent.click(colors[1]);
    fireEvent.click(getByText(/create tag/i));

    const fail = await findByText(/rejected/i);

    expect(container.contains(fail)).toBeTruthy();
  });
});