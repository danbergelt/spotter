import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";
import { fetchWorkoutsReducer } from "./fetchWorkoutsReducer";
import { globalReducer } from "./globalReducer";
import { tagsReducer } from "./tagsReducer";
import { optionsReducer } from "./optionsReducer";
import { fetchExercisesReducer } from "./fetchExercisesReducer";
import { prsReducer } from "./prsReducer";
import { LOGOUT } from "src/actions/globalActions";

const rootReducer = combineReducers({
  prsReducer,
  workoutReducer,
  fetchWorkoutsReducer,
  globalReducer,
  tagsReducer,
  optionsReducer,
  fetchExercisesReducer
});

// logout functionality -->
// no mutation, assigns the state to a temporary undefined variable that serves to 'reset' the state
// then, once a user logs in, the state is rehydrated with relevant data
export const reducer = (state: any, action: {type: string, payload: any}) => {
  if(action.type === LOGOUT) {
    state = undefined
  }
  return rootReducer(state, action)
}

export type AppState = ReturnType<typeof reducer>;
