import { generateWeek, generateMonth } from "./momentUtils";
import { store } from "../store";
import { fetchWorkouts } from "../actions/fetchWorkoutsActions";
import { History } from "history";

// utility function for fetching updated list of workouts upon mutation i.e. delete, update, save, etc.

const reFetch = (
  time: number,
  history: History,
  scope: string,
  t: string
): void => {
  let range: Array<any> = [];

  if (scope === "Week") {
    range = generateWeek(time);
  }

  if (scope === "Month") {
    range = generateMonth(time);
  }

  range = range.map(d => d.format("MMM DD YYYY"));
  store.dispatch<any>(
    fetchWorkouts<string[], History, string>(range, history, t)
  );
};

export default reFetch;
