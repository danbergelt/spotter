import {
  FETCH_WORKOUTS_START,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_ERROR,
  DELETE_WORKOUT
} from "../actions/fetchWorkoutsActions";

const fetchedWorkoutsState = {
  err: null,
  isLoading: false,
  workouts: []
};

// populates dashboard

export const fetchWorkoutsReducer = (state = fetchedWorkoutsState, action) => {
  switch (action.type) {
    case FETCH_WORKOUTS_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workouts: action.payload
      };
    case FETCH_WORKOUTS_ERROR:
      return {
        ...state,
        isLoading: false,
        err: action.payload
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout._id !== action.payload)
      }
    default:
      return state;
  }
};
