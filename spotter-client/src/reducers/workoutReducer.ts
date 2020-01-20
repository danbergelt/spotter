import {
  ADD_WORKOUT_TITLE,
  RESET_WORKOUT,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE,
  TOGGLE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  FROM_TEMPLATE,
  DEL_EXERCISE,
  QUEUE_EDIT,
  HANDLE_EDIT,
  RESET_QUEUE,
  FROM_SAVED
} from '../actions/workoutActions';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
import { find, isMatch, isEqual, omit, pick, keys } from 'lodash';
import { WorkoutReducer } from 'src/types/State';
import { TagOnWorkout } from 'src/types/TagOnWorkout';

const workoutState: WorkoutReducer = {
  title: '',
  notes: '',
  exercises: [],
  tags: [],
  queue: {},
  _id: null
};

// contains active workout details to be shared globally

export const workoutReducer = (
  state = workoutState,
  action: { type: string; payload: any }
): WorkoutReducer => {
  switch (action.type) {
    case ADD_WORKOUT_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case ADD_WORKOUT_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case RESET_WORKOUT:
      return {
        ...state,
        title: '',
        notes: '',
        exercises: [],
        tags: []
      };
    case RESET_NOTES:
      return {
        ...state,
        notes: ''
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case TOGGLE_TAG:
      // filters out unnecessary fields returned from MongoDB
      const testForMatches: TagOnWorkout | undefined = find(state.tags, t => {
        return isMatch(t, omit(action.payload, ['__v', 'user']));
      });
      return {
        // if the current list of tags contains the toggled tag, then remove it
        // otherwise, add it
        ...state,
        tags: testForMatches
          ? state.tags.filter(el => el._id !== action.payload._id)
          : [...state.tags, action.payload]
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(el => el._id !== action.payload._id)
      };
    case UPDATE_TAG:
      const testForUpdates: TagOnWorkout | undefined = find(state.tags, t => {
        // again, omit bad data from MongoDB and update the tag on the current workout
        return isMatch(
          omit(t, ['color', 'content', '__v', 'tag']),
          omit(action.payload, ['color', 'content', '__v', 'user'])
        );
      });
      return {
        ...state,
        tags: testForUpdates
          ? state.tags.map(t =>
              isEqual(t, testForUpdates) ? action.payload : t
            )
          : [...state.tags]
      };
    case FROM_TEMPLATE:
      const exercises = {
        name: null,
        sets: null,
        reps: null,
        weight: null
      };
      action.payload.exercises = action.payload.exercises.map((el: object) =>
        pick(el, keys(exercises))
      );
      return {
        ...state,
        title: action.payload.title,
        exercises: action.payload.exercises,
        notes: action.payload.notes,
        tags: action.payload.tags
      };
    case DEL_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter((_, i) => i !== action.payload)
      };
    case QUEUE_EDIT:
      return {
        ...state,
        queue: action.payload
      };
    case HANDLE_EDIT:
      return {
        ...state,
        queue: {},
        exercises: state.exercises.map((exercise, i) =>
          i === action.payload.i ? action.payload.exercise : exercise
        )
      };
    case RESET_QUEUE:
      return {
        ...state,
        queue: {}
      };
    case FROM_SAVED:
      return {
        ...state,
        _id: action.payload._id,
        exercises: action.payload.exercises,
        notes: action.payload.notes,
        tags: action.payload.tags,
        title: action.payload.title
      };
    case CLOSE_WORKOUT_MODAL:
      return {
        ...state,
        queue: {},
        title: '',
        notes: '',
        exercises: [],
        tags: []
      };
    default:
      return state;
  }
};
