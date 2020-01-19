import { find, isMatch, isEqual, omit, pick, keys } from 'lodash';
import { AnyAction } from 'redux';
import { WorkoutReducer } from '../types/State';
import { TagOnWorkout } from '../types/TagOnWorkout';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
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
import { Template } from '../types/Template';
import { Exercise } from '../types/Exercises';

const workoutState: WorkoutReducer = {
  title: '',
  notes: '',
  exercises: [],
  tags: [],
  queue: {},
  _id: null
};

/*
  HELPER FUNCTIONS
  used to make deep comparisons, pick fields off of nested objects, etc.
*/

// Test an object for matches with a comparison object
type TestForMatches = (
  state: WorkoutReducer,
  payload: TagOnWorkout
) => TagOnWorkout | undefined;

const testForMatches: TestForMatches = (state, payload) => {
  return find(state.tags, t => {
    return isMatch(t, omit(payload, ['__v', 'user']));
  });
};

// Test an object for changes between it and a comparison object
type TestForUpdates = (
  tags: Array<TagOnWorkout>,
  payload: {}
) => TagOnWorkout | undefined;
const testForUpdates: TestForUpdates = (tags, payload) =>
  find(tags, t => {
    // again, omit bad data from MongoDB and update the tag on the current workout
    return isMatch(
      omit(t, ['color', 'content', '__v', 'tag']),
      omit(payload, ['color', 'content', '__v', 'user'])
    );
  });

// Object with null values to pick fields for comparison
const pickFields = (payload: Template): Array<Exercise> => {
  const exercises = {
    name: null,
    sets: null,
    reps: null,
    weight: null
  };

  return payload.exercises.map(el => pick(el, keys(exercises))) as Array<
    Exercise
  >;
};

// contains active workout details to be shared globally

const workoutReducer = (
  state = workoutState,
  action: AnyAction
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
      return {
        // if the current list of tags contains the toggled tag, then remove it
        // otherwise, add it
        ...state,
        tags: testForMatches(state, action.payload)
          ? state.tags.filter(el => el._id !== action.payload._id)
          : [...state.tags, action.payload]
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(el => el._id !== action.payload._id)
      };
    case UPDATE_TAG:
      return {
        ...state,
        tags: testForUpdates(state.tags, action.payload)
          ? state.tags.map(t =>
              isEqual(t, testForUpdates(state.tags, action.payload))
                ? action.payload
                : t
            )
          : [...state.tags]
      };
    case FROM_TEMPLATE:
      return {
        ...state,
        title: action.payload.title,
        exercises: pickFields(action.payload),
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

export default workoutReducer;
