import { workoutReducer } from "../../reducers/workoutReducer";
import {
  ADD_WORKOUT_TITLE,
  RESET_WORKOUT,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE
} from "../../actions/workoutActions";

describe("add workout reducer", () => {
  test("should return initial state", () => {
    expect(workoutReducer(undefined, {})).toEqual({
      title: "",
      notes: "",
      exercises: []
    });
  });

  test("should handle ADD_WORKOUT_TITLE", () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_WORKOUT_TITLE,
        payload: "title"
      })
    ).toEqual({ title: "title", notes: "", exercises: [] });
  });

  test("should handle ADD_WORKOUT_NOTES", () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_WORKOUT_NOTES,
        payload: "notes"
      })
    ).toEqual({ title: "", notes: "notes", exercises: [] });
  });

  test("should handle RESET_WORKOUT", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "",
          exercises: [{ name: "name" }]
        },
        { type: RESET_WORKOUT }
      )
    ).toEqual({ title: "", notes: "", exercises: [] });
  });

  test("should handle RESET_NOTES", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "notes",
          exercises: []
        },
        { type: RESET_NOTES }
      )
    ).toEqual({ title: "", notes: "", exercises: [] });
  });

  test("should handle ADD_EXERCISE", () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_EXERCISE,
        payload: { name: "name" }
      })
    ).toEqual({ title: "", notes: "", exercises: [{ name: "name" }] });
  });
});
