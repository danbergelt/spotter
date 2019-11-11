import {
  ADD_WORKOUT_TITLE,
  ADD_WORKOUT_NOTES,
  RESET_NOTES
} from "../actions/addWorkoutActions";

const initialState = {
  title: "",
  notes: ""
};

export const addWorkoutReducer = (state = initialState, action) => {
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
    case RESET_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    default:
      return state;
  }
};
