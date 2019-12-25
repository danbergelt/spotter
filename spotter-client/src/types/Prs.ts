export type SortedPrsRange = [{ name: string; date: string; weight: number }][];

export interface SortedPrs {
  lastMonth: SortedPrsRange;
  lastYear: SortedPrsRange;
  allTime: SortedPrsRange;
}
