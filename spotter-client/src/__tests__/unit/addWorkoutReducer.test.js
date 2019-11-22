import { addWorkoutReducer } from "../../reducers/addWorkoutReducer";
import {
  ADD_WORKOUT_TITLE,
  RESET_WORKOUT,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE
} from "../../actions/addWorkoutActions";

describe("add workout reducer", () => {
  test("should return initial state", () => {
    expect(addWorkoutReducer(undefined, {})).toEqual({
      title: "",
      notes: "",
      exercises: []
    });
  });

  test("should handle ADD_WORKOUT_TITLE", () => {
    expect(
      addWorkoutReducer(undefined, {
        type: ADD_WORKOUT_TITLE,
        payload: "title"
      })
    ).toEqual({ title: "title", notes: "", exercises: [] });
  });

  test("should handle ADD_WORKOUT_NOTES", () => {
    expect(
      addWorkoutReducer(undefined, {
        type: ADD_WORKOUT_NOTES,
        payload: "notes"
      })
    ).toEqual({ title: "", notes: "notes", exercises: [] });
  });

  test("should handle RESET_WORKOUT", () => {
    expect(
      addWorkoutReducer(
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
      addWorkoutReducer(
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
      addWorkoutReducer(undefined, {
        type: ADD_EXERCISE,
        payload: { name: "name" }
      })
    ).toEqual({ title: "", notes: "", exercises: [{ name: "name" }] });
  });
});
