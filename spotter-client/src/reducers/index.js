import { combineReducers } from "redux";
import { addWorkoutReducer } from "./addWorkoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";

export default combineReducers({
  addWorkoutReducer,
  fetchWorkoutsReducer
});
