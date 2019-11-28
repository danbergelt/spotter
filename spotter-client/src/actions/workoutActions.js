export const ADD_WORKOUT_TITLE = "ADD_WORKOUT_TITLE";
export const ADD_WORKOUT_NOTES = "ADD_WORKOUT_NOTES";
export const RESET_NOTES = "RESET_NOTES";
export const ADD_EXERCISE = "ADD_EXERCISE";
export const RESET_WORKOUT = "RESET_WORKOUT";
export const TOGGLE_TAG = "TOGGLE_TAG";
export const UPDATE_TAG = "UPDATE_TAG";
export const DELETE_TAG = "DELETE_TAG";

export const addWorkoutTitle = title => {
  return { type: ADD_WORKOUT_TITLE, payload: title };
};

export const addWorkoutNotes = notes => {
  return { type: ADD_WORKOUT_NOTES, payload: notes };
};

export const addExercise = exercise => {
  return { type: ADD_EXERCISE, payload: exercise };
};

export const toggleTag = tag => {
  return { type: TOGGLE_TAG, payload: tag };
};

export const deleteTag = tag => {
  return { type: DELETE_TAG, payload: tag };
};

export const updateTag = tag => {
  return { type: UPDATE_TAG, payload: tag };
};

export const resetWorkout = () => {
  return { type: RESET_WORKOUT };
};

export const resetNotes = () => {
  return { type: RESET_NOTES };
};
