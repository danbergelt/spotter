import { generateWeek, generateMonth } from "./momentUtils";
import { store } from "../index";
import { fetchWorkouts } from "../actions/fetchWorkoutsActions";

// utility function for fetching updated list of workouts upon mutation i.e. delete, update, save, etc.

const reFetch = (time, history, scope) => {
  let range;

  if (scope === "Week") {
    range = generateWeek(time);
  }

  if (scope === "Month") {
    range = generateMonth(time);
  }

  range = range.map(d => d.format("MMM DD YYYY"));
  store.dispatch(fetchWorkouts(range, history));
};

export default reFetch;
