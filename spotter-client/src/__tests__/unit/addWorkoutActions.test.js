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
  resetNotes
} from "../../actions/addWorkoutActions";

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
});
