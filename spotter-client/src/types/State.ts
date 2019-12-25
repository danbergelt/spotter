export interface GlobalReducer {
  t: null | string;
  ctx: null | string;
  scope: { value: string; label: string };
  date: number;
}

export interface WorkoutReducer {
  title: string;
  notes: string;
  exercises: Array<any>;
  tags: Array<any>;
  queue: object;
  _id: null | string;
}

export interface TagsReducer {
  isLoading: boolean;
  err: any;
  tags: object;
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
