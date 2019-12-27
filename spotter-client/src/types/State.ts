import { Queued, Exercise } from "./Exercises";
import { TagOnWorkout as Tag } from "./TagOnWorkout";
import { Moment } from "moment";

export interface GlobalReducer {
  t: null | string;
  ctx: null | string;
  scope: { value: string; label: string };
  date: null | Moment;
}

export interface WorkoutReducer {
  title: string;
  notes: string;
  exercises: Array<Exercise>;
  tags: Array<Tag>;
  queue: Partial<Queued>;
  _id: null | string;
}

export interface TagsReducer {
  isLoading: boolean;
  err: any;
  tags: Array<Tag>;
}

export interface PrsReducer {
  err: any;
  isLoading: boolean;
  prs: object;
}

export interface OptionsReducer {
  active: number;
  tagModal: boolean;
  templateSave: boolean;
  fromTemplate: boolean;
  confirmDelete: boolean;
  exercises: boolean;
  templates: Array<any>;
  templatesErr: string;
  saveMsg: object;
}

export interface FetchWorkoutsReducer {
  err: any;
  isLoading: boolean;
  workouts: Array<any>;
}

export interface FetchExercisesReducer {
  err: any;
  savedExercises: Array<any>;
}

export interface State {
  globalReducer: GlobalReducer;
  workoutReducer: WorkoutReducer;
  fetchExercisesReducer: FetchExercisesReducer;
  fetchWorkoutsReducer: FetchWorkoutsReducer;
  optionsReducer: OptionsReducer;
  prsReducer: PrsReducer;
  tagsReducer: TagsReducer;
}
