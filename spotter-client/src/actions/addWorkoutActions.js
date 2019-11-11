export const ADD_WORKOUT_TITLE = "ADD_WORKOUT_TITLE";
export const ADD_WORKOUT_NOTES = "ADD_WORKOUT_NOTES";
export const RESET_NOTES = "RESET_NOTES";

export const addWorkoutTitle = title => {
  return dispatch => {
    dispatch({ type: ADD_WORKOUT_TITLE, payload: title });
  };
};

export const addWorkoutNotes = notes => {
  return dispatch => {
    dispatch({ type: ADD_WORKOUT_NOTES, payload: notes });
  };
};

export const resetNotes = empty => {
  return dispatch => {
    dispatch({ type: RESET_NOTES, payload: empty });
  };
};
