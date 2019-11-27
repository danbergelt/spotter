import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";
import { tokenReducer } from "./tokenReducer";
import { tagsReducer } from "./tagsReducer";

export default combineReducers({
  workoutReducer,
  fetchWorkoutsReducer,
  tokenReducer,
  tagsReducer
});
