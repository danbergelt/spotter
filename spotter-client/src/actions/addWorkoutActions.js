export const ADD_WORKOUT_TITLE = "ADD_WORKOUT_TITLE";
export const ADD_WORKOUT_NOTES = "ADD_WORKOUT_NOTES";
export const RESET_NOTES = "RESET_NOTES";
export const ADD_EXERCISE = "ADD_EXERCISE";
export const RESET_WORKOUT = "RESET_WORKOUT";

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

export const addExercise = exercise => {
  return dispatch => {
    dispatch({ type: ADD_EXERCISE, payload: exercise });
  };
};

export const resetWorkout = () => {
  return dispatch => {
    dispatch({ type: RESET_WORKOUT });
  };
};

export const resetNotes = () => {
  return dispatch => {
    dispatch({ type: RESET_NOTES });
  };
};
