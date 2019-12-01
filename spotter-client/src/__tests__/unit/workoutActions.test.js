import {
  addWorkoutTitle,
  ADD_WORKOUT_TITLE,
  addWorkoutNotes,
  ADD_WORKOUT_NOTES,
  addExercise,
  ADD_EXERCISE,
  RESET_NOTES,
  RESET_WORKOUT,
  resetWorkout,
  resetNotes,
  TOGGLE_TAG,
  toggleTag,
  UPDATE_TAG,
  updateTag,
  DELETE_TAG,
  deleteTag,
  FROM_TEMPLATE,
  fromTemplate,
  DEL_EXERCISE,
  delExercise,
  queueEdit,
  QUEUE_EDIT,
  handleEdit,
  HANDLE_EDIT,
  resetQueue,
  RESET_QUEUE
} from "../../actions/workoutActions";

describe("add workout actions", () => {
  test("add workout title", () => {
    const text = "text";
    const expectedAction = {
      type: ADD_WORKOUT_TITLE,
      payload: text
    };
    expect(addWorkoutTitle("text")).toEqual(expectedAction);
  });

  test("add workout notes", () => {
    const notes = "notes";
    const expectedAction = {
      type: ADD_WORKOUT_NOTES,
      payload: notes
    };
    expect(addWorkoutNotes("notes")).toEqual(expectedAction);
  });

  test("add exercise", () => {
    const exercise = { name: "name", weight: "1", sets: "1", reps: "1" };
    const expectedAction = {
      type: ADD_EXERCISE,
      payload: exercise
    };
    expect(addExercise(exercise)).toEqual(expectedAction);
  });

  test("reset notes", () => {
    const expectedAction = {
      type: RESET_NOTES
    };
    expect(resetNotes()).toEqual(expectedAction);
  });

  test("reset workout", () => {
    const expectedAction = {
      type: RESET_WORKOUT
    };
    expect(resetWorkout()).toEqual(expectedAction);
  });

  test("toggle tag", () => {
    const tag = { tag: "tag" };
    const expectedAction = {
      type: TOGGLE_TAG,
      payload: tag
    };
    expect(toggleTag(tag)).toEqual(expectedAction);
  });

  test("delete tag", () => {
    const tag = { tag: "tag" };
    const expectedAction = {
      type: DELETE_TAG,
      payload: tag
    };
    expect(deleteTag(tag)).toEqual(expectedAction);
  });

  test("update tag", () => {
    const tag = { tag: "tag" };
    const expectedAction = {
      type: UPDATE_TAG,
      payload: tag
    };
    expect(updateTag(tag)).toEqual(expectedAction);
  });

  test("from template", () => {
    const template = { template: "template" };
    const expectedAction = {
      type: FROM_TEMPLATE,
      payload: template
    };
    expect(fromTemplate(template)).toEqual(expectedAction);
  });

  test("del exercise", () => {
    const i = { i: "1" };
    const expectedAction = {
      type: DEL_EXERCISE,
      payload: i
    };
    expect(delExercise(i)).toEqual(expectedAction);
  });

  test("queue exercise", () => {
    const test = { exercise: "e", i: "1" };
    const expectedAction = {
      type: QUEUE_EDIT,
      payload: test
    };
    expect(queueEdit("e", "1")).toEqual(expectedAction);
  });

  test("handle edit", () => {
    const test = { exercise: "e", i: "1" };
    const expectedAction = {
      type: HANDLE_EDIT,
      payload: test
    };
    expect(handleEdit("e", "1")).toEqual(expectedAction);
  });

  test("reset queue", () => {
    const expectedAction = {
      type: RESET_QUEUE
    };
    expect(resetQueue()).toEqual(expectedAction);
  });
});