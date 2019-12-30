import { Exercise } from "src/types/Exercises";

// synchronous workout actions, i.e. adding workout information
// kept in redux store to allow for global access and flexible functionality, despite being largely input data and synchronous

export const ADD_WORKOUT_TITLE: string = "ADD_WORKOUT_TITLE";
export const ADD_WORKOUT_NOTES: string = "ADD_WORKOUT_NOTES";
export const RESET_NOTES: string = "RESET_NOTES";
export const ADD_EXERCISE: string = "ADD_EXERCISE";
export const RESET_WORKOUT: string = "RESET_WORKOUT";
export const TOGGLE_TAG: string = "TOGGLE_TAG";
export const UPDATE_TAG: string = "UPDATE_TAG";
export const DELETE_TAG: string = "DELETE_TAG";
export const FROM_TEMPLATE: string = "FROM_TEMPLATE";
export const DEL_EXERCISE: string = "DEL_EXERCISE";
export const QUEUE_EDIT: string = "QUEUE_EDIT";
export const HANDLE_EDIT: string = "HANDLE_EDIT";
export const RESET_QUEUE: string = "RESET_QUEUE";
export const FROM_SAVED: string = "FROM_SAVED";

//@desc --> resets the queue when clear button is clicked
type TResetQueue = () => { type: string };
export const resetQueueAction: TResetQueue = () => {
  return { type: RESET_QUEUE };
};

// @desc --> resets the exercise form when cleared
type TResetExerciseForm = (handleReset: () => void) => { type: string };
export const resetExerciseFormAction: TResetExerciseForm = handleReset => {
  handleReset();
  return resetQueueAction();
};

// @desc --> adds a new exercise to the current workout
type TAddExercise = (values: Exercise) => { type: string; payload: Exercise };
export const addExerciseAction: TAddExercise = values => {
  return { type: ADD_EXERCISE, payload: values };
};

// @desc --> if an exercise is queued to be edited, submits those edits and updates the exercise
type TEditExercise = (values: Exercise, queuedIdx: number) => { type: string };
export const editExerciseAction: TEditExercise = (values, queuedIdx) => {
  return { type: HANDLE_EDIT, payload: { exercise: values, i: queuedIdx } };
};

//@desc --> queue an exercise for editing
type THandleQueue = (
  exercise: Exercise,
  i: number
) => { type: string; payload: { exercise: Exercise; i: number } };
export const handleQueueAction: THandleQueue = (exercise, i) => {
  return { type: QUEUE_EDIT, payload: { exercise, i } };
};

//@desc --> deletes an exercise from the current workout
type TDelExercise = (i: number) => { type: string; payload: number };
export const delExerciseAction: TDelExercise = i => {
  return { type: DEL_EXERCISE, payload: i };
};

//@desc --> adds workout notes
type TAddNotes = (value: string) => { type: string; payload: string };
export const addNotesAction: TAddNotes = value => {
  return { type: ADD_WORKOUT_NOTES, payload: value };
};

//@desc --> reset workout notes
type TResetNotes = (emptyStr: string) => { type: string; payload: string };
export const resetNotesAction: TResetNotes = emptyStr => {
  return { type: RESET_NOTES, payload: emptyStr };
};

//@desc --> add workout title
type TAddTitle = (value: string) => { type: string; payload: string };
export const addTitleAction: TAddTitle = value => {
  return { type: ADD_WORKOUT_TITLE, payload: value };
};
