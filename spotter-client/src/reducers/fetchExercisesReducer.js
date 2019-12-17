import {
  FETCH_EXERCISES_ERROR,
  FETCH_EXERCISES_SUCCESS
} from "../actions/fetchExercisesActions";

const fetchExercisesState = {
  err: null,
  exercises: []
};

// populates dashboard

export const fetchExercisesReducer = (state = fetchExercisesState, action) => {
  switch (action.type) {
    case FETCH_EXERCISES_SUCCESS:
      return {
        ...state,
        err: null,
        exercises: action.payload
      };
    case FETCH_EXERCISES_ERROR:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
