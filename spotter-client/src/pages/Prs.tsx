import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Moment from "moment";
import { extendMoment, MomentRange } from "moment-range";
import PrSection from "../components/prs/PrSection";
import { State, fetchToken } from "src/types/State";
import { SortedPrs, SortedPrsRange } from "../types/Prs";
import { fetchExercises } from "src/actions/fetchExercisesActions";

const moment: MomentRange = extendMoment(Moment);
let m = require("moment");
if ("default" in m) {
  m = moment["default"];
}

const categories: Array<string> = ["Last Month", "Last Year", "All Time"];

const Prs: React.FC = () => {
  const dispatch = useDispatch();
  const [sortedPrs, setSortedPrs] = useState<SortedPrs>({
    lastMonth: [],
    lastYear: [],
    allTime: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  const exercises: Array<any> = useSelector(
    (state: State) => state.fetchExercisesReducer.savedExercises
  );

  const t: string | null = useSelector(fetchToken);
  
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchExercises(history, t));
  }, [dispatch, t]);

  // finds the difference between two moment dates
  const findDiff = (exercise: any): number => 
    m().diff(m(exercise.prDate, "MMM DD YYYY"), "days");

  // set PRs to state organized by time period in which the PR was set
  useEffect(() => {
    // temporary variables for sorted prs
    let lastMonth: SortedPrsRange = [];
    let lastYear: SortedPrsRange = [];
    let allTime: SortedPrsRange = [];
    // loop through prs, and partition by date
    if (exercises.length) {
      exercises.forEach(exercise => {
        const diff = findDiff(exercise);
        if (exercise.pr > 0 && exercise.prDate) {
          if (diff <= 31) {
            lastMonth = [...lastMonth, exercise];
          } else if (diff <= 365) {
            lastYear = [...lastYear, exercise];
          } else {
            allTime = [...allTime, exercise];
          }
        }
      });
    }
    setSortedPrs({
      lastMonth,
      lastYear,
      allTime
    });

    // cleanup function to set loading to false, allowing the sections to be rendered
    return () => setLoading(false);
  }, [exercises]);

  return (
    <div className="prs-container spacer">
      {!loading &&
        Object.keys(sortedPrs).map((key, i) => (
          <PrSection
            key={categories[i]}
            prs={sortedPrs[key]}
            title={categories[i]}
          />
        ))}
    </div>
  );
};

export default Prs;
