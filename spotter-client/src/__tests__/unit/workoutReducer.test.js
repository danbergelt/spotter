import { workoutReducer } from "../../reducers/workoutReducer";
import {
  ADD_WORKOUT_TITLE,
  RESET_WORKOUT,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE,
  TOGGLE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  FROM_TEMPLATE,
  DEL_EXERCISE
} from "../../actions/workoutActions";

describe("add workout reducer", () => {
  test("should return initial state", () => {
    expect(workoutReducer(undefined, {})).toEqual({
      title: "",
      notes: "",
      tags: [],
      exercises: []
    });
  });

  test("should handle ADD_WORKOUT_TITLE", () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_WORKOUT_TITLE,
        payload: "title"
      })
    ).toEqual({ title: "title", notes: "", tags: [], exercises: [] });
  });

  test("should handle ADD_WORKOUT_NOTES", () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_WORKOUT_NOTES,
        payload: "notes"
      })
    ).toEqual({ title: "", notes: "notes", tags: [], exercises: [] });
  });

  test("should handle RESET_WORKOUT", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "",
          tags: [],
          exercises: [{ name: "name" }]
        },
        { type: RESET_WORKOUT }
      )
    ).toEqual({ title: "", notes: "", tags: [], exercises: [] });
  });

  test("should handle RESET_NOTES", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "notes",
          tags: [],
          exercises: []
        },
        { type: RESET_NOTES }
      )
    ).toEqual({ title: "", notes: "", tags: [], exercises: [] });
  });

  test("should handle ADD_EXERCISE", () => {
    expect(
      workoutReducer(undefined, {
        type: ADD_EXERCISE,
        payload: { name: "name" }
      })
    ).toEqual({
      title: "",
      notes: "",
      tags: [],
      exercises: [{ name: "name" }]
    });
  });

  test("should handle TOGGLE_TAG - add", () => {
    expect(
      workoutReducer(undefined, {
        type: TOGGLE_TAG,
        payload: { tag: "tag" }
      })
    ).toEqual({
      title: "",
      notes: "",
      tags: [{ tag: "tag" }],
      exercises: []
    });
  });

  test("should handle TOGGLE_TAG - remove", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "",
          tags: [{ tag: "tag" }],
          exercises: []
        },
        { type: TOGGLE_TAG, payload: { tag: "tag" } }
      )
    ).toEqual({ title: "", notes: "", tags: [], exercises: [] });
  });

  test("should handle DELETE_TAG", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "",
          tags: [{ _id: "id", tag: "tag" }],
          exercises: []
        },
        { type: DELETE_TAG, payload: { _id: "id", tag: "tag" } }
      )
    ).toEqual({ title: "", notes: "", tags: [], exercises: [] });
  });

  test("should handle UPDATE_TAG", () => {
    expect(
      workoutReducer(
        {
          title: "",
          notes: "",
          tags: [{ _id: "id", color: "tag" }],
          exercises: []
        },
        { type: UPDATE_TAG, payload: { _id: "id", color: "new" } }
      )
    ).toEqual({
      title: "",
      notes: "",
      tags: [{ _id: "id", color: "new" }],
      exercises: []
    });
  });

  test("should handle FROM_TEMPLATE", () => {
    expect(
      workoutReducer(undefined, {
        type: FROM_TEMPLATE,
        payload: { title: "t", exercises: [], tags: "tags", notes: "n" }
      })
    ).toEqual({ title: "t", exercises: [], tags: "tags", notes: "n" });
  });

  test("should handle DEL_EXERCISE", () => {
    expect(
      workoutReducer(
        { exercises: [{ e: {} }] },
        { type: DEL_EXERCISE, payload: 0 }
      )
    ).toEqual({ exercises: [] });
  });
});
