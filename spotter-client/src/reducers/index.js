import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";
import { globalReducer } from "./globalReducer";
import { tagsReducer } from "./tagsReducer";
import { optionsReducer } from "./optionsReducer";
import { fetchExercisesReducer } from "./fetchExercisesReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const reducer = combineReducers({
  workoutReducer,
  fetchWorkoutsReducer,
  globalReducer,
  tagsReducer,
  optionsReducer,
  fetchExercisesReducer
});

export const store = createStore(reducer, applyMiddleware(thunk));
