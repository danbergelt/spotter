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
  DEL_EXERCISE,
  EDIT_EXERCISE,
  TRIGGER_EDIT_EXERCISE
} from "../actions/workoutActions";
import { find, isMatch, isEqual, omit } from "lodash";

const workoutState = {
  title: "",
  notes: "",
  exercises: [],
  tags: [],
  toEdit: {}
};

export const workoutReducer = (state = workoutState, action) => {
  switch (action.type) {
    case ADD_WORKOUT_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case ADD_WORKOUT_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case RESET_WORKOUT:
      return {
        ...state,
        title: "",
        notes: "",
        exercises: [],
        tags: []
      };
    case RESET_NOTES:
      return {
        ...state,
        notes: ""
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case TOGGLE_TAG:
      const testForMatches = find(state.tags, t => {
        return isMatch(t, action.payload);
      });
      return {
        ...state,
        tags: testForMatches
          ? state.tags.filter(el => el._id !== action.payload._id)
          : [...state.tags, action.payload]
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(el => el._id !== action.payload._id)
      };
    case UPDATE_TAG:
      const testForUpdates = find(state.tags, t => {
        return isMatch(
          omit(t, ["color", "content", "__v"]),
          omit(action.payload, ["color", "content", "__v"])
        );
      });
      return {
        ...state,
        tags: testForUpdates
          ? state.tags.map(t =>
              isEqual(t, testForUpdates) ? action.payload : t
            )
          : [...state.tags]
      };
    case FROM_TEMPLATE:
      return {
        ...state,
        title: action.payload.title,
        exercises: action.payload.exercises,
        notes: action.payload.notes,
        tags: action.payload.tags
      };
    case DEL_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter((_, i) => i !== action.payload)
      };
    default:
      return state;
  }
};
