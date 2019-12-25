export type SortedPr = [{ name: string; date: string; weight: number }][];

export interface SortedPrs {
  lastMonth: SortedPr;
  lastYear: SortedPr;
  allTime: SortedPr;
}
