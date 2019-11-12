import {
  ADD_WORKOUT_TITLE,
  RESET_WORKOUT,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE
} from "../actions/addWorkoutActions";

const addWorkoutState = {
  title: "",
  notes: "",
  exercises: []
};

export const addWorkoutReducer = (state = addWorkoutState, action) => {
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
        exercises: []
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
    default:
      return state;
  }
};
