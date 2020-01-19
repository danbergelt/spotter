import { combineReducers, AnyAction } from 'redux';
import { LOGOUT } from '../actions/globalActions';
import { State } from '../types/State';
import workoutReducer from './workoutReducer';
import fetchWorkoutsReducer from './fetchWorkoutsReducer';
import globalReducer from './globalReducer';
import tagsReducer from './tagsReducer';
import optionsReducer from './optionsReducer';
import fetchExercisesReducer from './fetchExercisesReducer';

const appReducer = combineReducers({
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
type TReducer = (state: State | undefined, action: AnyAction) => State;
const reducer: TReducer = (state, action) => {
  let newState = state;
  if (action.type === LOGOUT) {
    newState = undefined;
  }
  return appReducer(newState, action);
};

export default reducer;
