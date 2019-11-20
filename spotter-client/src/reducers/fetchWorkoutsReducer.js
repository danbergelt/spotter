import {
  FETCH_WORKOUTS_START,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_ERROR
} from "../actions/fetchWorkoutsActions";

const fetchedWorkoutsState = {
  err: null,
  isLoading: false,
  workouts: []
};

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
    default:
      return state;
  }
};