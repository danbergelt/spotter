import React from "react";
import WorkoutColumns from "../../../../components/dash/workouts/week/WorkoutColumns";
import WorkoutModal from "../../../../components/dash/workoutmodal/WorkoutModal";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import wrapper from "../../../../__testUtils__/wrapper";
import Modal from "react-modal";
import axios from "axios";
import mockWorkoutRes from "../../../../__testUtils__/mockWorkoutRes";
import { reducer } from "../../../../reducers/index";

describe("add workout modal functionality", () => {
  // initial setup
  afterEach(cleanup);
  Modal.setAppElement(document.createElement("div"));

  test("open and close modal functionality", () => {
    // suppresses warning for rendering document.body directly in render function
    console.error = jest.fn();
    axios.post.mockResolvedValue(mockWorkoutRes);
    const {
      queryByPlaceholderText,
      getByTestId,
      queryByTestId,
      store
    } = wrapper(reducer, <WorkoutColumns />);

    fireEvent.click(getByTestId(/modal-click/i));

    expect(queryByPlaceholderText(/e.g. squat/i)).toBeTruthy();
    expect(queryByTestId(/exit-modal/i)).toBeTruthy();

    fireEvent.click(getByTestId(/exit-modal/i));

    expect(queryByTestId(/exit-modal/i)).toBeFalsy();
    expect(queryByPlaceholderText(/e.g. squat/i)).toBeFalsy();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test("can hold user-entered text in title and notes", () => {
    const { container, queryByTestId, getByPlaceholderText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    expect(queryByTestId(/exit-modal/i)).toBeTruthy();

    const title = getByPlaceholderText(/click to enter a title.../i);

    fireEvent.change(title, { target: { value: "test title" } });

    expect(container.innerHTML).toMatch(/test title/i);

    const notes = getByPlaceholderText(/click to enter some notes.../i);

    fireEvent.change(notes, { target: { value: "test notes" } });

    expect(container.innerHTML).toMatch(/test notes/i);
  });

  test("edit notes focuses notes", () => {
    const { container, queryByText, getByPlaceholderText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const notes = getByPlaceholderText(/click to enter some notes.../i);

    fireEvent.change(notes, { target: { value: "test notes" } });

    expect(container.innerHTML).toMatch(/test notes/i);

    fireEvent.blur(notes);

    expect(queryByText(/edit/i)).toBeTruthy();

    fireEvent.click(queryByText(/edit/i));

    expect(document.activeElement).toEqual(notes);
  });

  test("trashcan empties notes", () => {
    const { container, getByTestId, getByPlaceholderText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const notes = getByPlaceholderText(/click to enter some notes.../i);

    fireEvent.change(notes, { target: { value: "test notes" } });

    expect(container.innerHTML).toMatch(/test notes/i);

    fireEvent.focus(getByPlaceholderText(/click to enter some notes.../i));

    fireEvent.mouseDown(getByTestId(/trash$/i));

    expect(container.innerHTML).not.toMatch(/test notes/i);
  });

  test("exercise form inputs work", () => {
    const { getByPlaceholderText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);
    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(name, { target: { value: "test name" } });
    expect(name.value).toEqual("test name");

    fireEvent.change(weight, { target: { value: 100 } });
    expect(weight.value).toEqual("100");

    fireEvent.change(sets, { target: { value: 100 } });
    expect(sets.value).toEqual("100");

    fireEvent.change(reps, { target: { value: 100 } });
    expect(reps.value).toEqual("100");
  });

  test("can't enter letters in number inputs", () => {
    const { getByPlaceholderText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(weight, { target: { value: "a" } });
    expect(weight.value).toEqual("");

    fireEvent.change(sets, { target: { value: "a" } });
    expect(sets.value).toEqual("");

    fireEvent.change(reps, { target: { value: "a" } });
    expect(reps.value).toEqual("");
  });

  test("name is required", async () => {
    const { findByText, getByPlaceholderText, container, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);

    fireEvent.focus(name);
    fireEvent.blur(name);

    const yup = await findByText(/enter exercise name/i);

    expect(container.contains(yup)).toBeTruthy();
  });

  test("40 character max on name field", async () => {
    const { findByText, container, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = container.querySelector('input[name="name"]');

    expect(name).not.toBe(null);

    fireEvent.change(name, {
      target: {
        value:
          "jiojioncionqwcoeqwcnoeicneio2ncioe2cnioecneioncioencioe2ncioe2ncioneio2nfio2ecnioe2ncio"
      }
    });

    fireEvent.blur(name);

    const yup = await findByText(/40 character max/i);

    expect(container.contains(yup)).toBeTruthy();
  });

  test("2000 lb limit enforced", async () => {
    const {
      queryByText,
      getByPlaceholderText,
      container,
      getAllByText,
      getByTestId,
      store
    } = wrapper(reducer, <WorkoutModal modal={true} />);

    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    // Testing one lb under limit to confirm boundary
    fireEvent.change(weight, { target: { value: 1999 } });
    fireEvent.blur(weight);
    const one = await wait(() => queryByText(/2000 lb limit/i));
    expect(container.contains(one)).toBeFalsy();

    fireEvent.change(sets, { target: { value: 1999 } });
    fireEvent.blur(sets);
    const two = await wait(() => queryByText(/2000 lb limit/i));
    expect(container.contains(two)).toBeFalsy();

    fireEvent.change(reps, { target: { value: 1999 } });
    fireEvent.blur(reps);
    const three = await wait(() => queryByText(/2000 lb limit/i));
    expect(container.contains(three)).toBeFalsy();

    // Testing one lb over limit to confirm error

    fireEvent.change(weight, { target: { value: 2001 } });

    fireEvent.change(sets, { target: { value: 2001 } });

    fireEvent.change(reps, { target: { value: 2001 } });

    fireEvent.click(getByTestId(/submit-exercise/i));

    await wait(() => expect(getAllByText(/2000 lb limit/i).length).toBe(3));
  });

  test("trashcan empties exercise inputs", () => {
    const { getByPlaceholderText, getByTestId, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);
    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(name, { target: { value: "test name" } });
    expect(name.value).toEqual("test name");
    fireEvent.change(weight, { target: { value: 100 } });
    expect(weight.value).toEqual("100");
    fireEvent.change(sets, { target: { value: 100 } });
    expect(sets.value).toEqual("100");
    fireEvent.change(reps, { target: { value: 100 } });
    expect(reps.value).toEqual("100");

    fireEvent.click(getByTestId(/trash-exercise/i));

    expect(name.value).toEqual("");
    expect(weight.value).toEqual("");
    expect(sets.value).toEqual("");
    expect(reps.value).toEqual("");
  });

  test("submitted exercise renders on page", async () => {
    const {
      store,
      container,
      getByPlaceholderText,
      getByTestId,
      getByText
    } = wrapper(reducer, <WorkoutModal modal={true} />);

    const name = getByPlaceholderText(/e.g. squat/i);
    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(name, { target: { value: "test name" } });
    expect(name.value).toEqual("test name");
    fireEvent.change(weight, { target: { value: 100 } });
    expect(weight.value).toEqual("100");
    fireEvent.change(sets, { target: { value: 100 } });
    expect(sets.value).toEqual("100");
    fireEvent.change(reps, { target: { value: 100 } });
    expect(reps.value).toEqual("100");

    fireEvent.click(getByTestId(/submit-exercise/i));

    await wait(() => {
      expect(name.value).toEqual("");
      expect(weight.value).toEqual("");
      expect(sets.value).toEqual("");
      expect(reps.value).toEqual("");
      expect(container.contains(getByText(/test name/i))).toBeTruthy();
      expect(container.contains(getByText(/100 lbs/i))).toBeTruthy();
      expect(container.contains(getByText(/100 reps/i))).toBeTruthy();
      expect(container.contains(getByText(/100 sets/i))).toBeTruthy();
    });
  });
});
