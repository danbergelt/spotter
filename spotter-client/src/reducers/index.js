import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";
import { globalReducer } from './globalReducer'
import { tagsReducer } from "./tagsReducer";
import { optionsReducer } from './optionsReducer';

export default combineReducers({
  workoutReducer,
  fetchWorkoutsReducer,
  globalReducer,
  tagsReducer,
  optionsReducer
});
