export type SortedPrsRange = [{ name: string; date: string; pr: number }][];

export interface SortedPrs {
  lastMonth: SortedPrsRange;
  lastYear: SortedPrsRange;
  allTime: SortedPrsRange;
}

export interface Pr {
  name: string;
  date: string;
  pr: number
}
