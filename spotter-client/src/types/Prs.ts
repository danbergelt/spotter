import { Exercise } from './ExerciseOption';

export type SortedPrsRange = Array<Exercise>;

export interface SortedPrs {
  lastMonth: SortedPrsRange;
  lastYear: SortedPrsRange;
  allTime: SortedPrsRange;
}
