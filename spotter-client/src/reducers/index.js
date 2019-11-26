import { combineReducers } from "redux";
import { addWorkoutReducer } from "./addWorkoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";
import { tokenReducer } from "./tokenReducer";

export default combineReducers({
  addWorkoutReducer,
  fetchWorkoutsReducer,
  tokenReducer
});
