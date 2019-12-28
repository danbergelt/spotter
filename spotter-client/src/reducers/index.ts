import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";
import { globalReducer } from "./globalReducer";
import { tagsReducer } from "./tagsReducer";
import { optionsReducer } from "./optionsReducer";
import { fetchExercisesReducer } from "./fetchExercisesReducer";
import { prsReducer } from "./prsReducer";

export const reducer = combineReducers({
  prsReducer,
  workoutReducer,
  fetchWorkoutsReducer,
  globalReducer,
  tagsReducer,
  optionsReducer,
  fetchExercisesReducer
});

export type AppState = ReturnType<typeof reducer>;
