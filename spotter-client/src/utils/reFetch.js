import { generateWeek } from "./momentUtils";
import { store } from "./store";
import { fetchWorkouts } from "../actions/fetchWorkoutsActions";

// utility function for fetching updated list of workouts upon mutation i.e. delete, update, save, etc.

const reFetch = (week, history) => {
  let range = generateWeek(week);
  // console.log(store.getState())
  range = range.map(d => d.format("MMM DD YYYY"));
  store.dispatch(fetchWorkouts(range, history));
};

export default reFetch;
