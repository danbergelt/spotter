import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrs } from "../actions/prActions";
import * as Moment from "moment";
import { extendMoment, MomentRange } from "moment-range";
import PrSection from "../components/prs/PrSection";
import { State, fetchToken } from "src/types/State";
import { SortedPrs, SortedPrsRange } from "../types/Prs";

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

  const prs: Array<any> = useSelector((state: State) => state.prsReducer.prs);
  const t: string | null = useSelector(fetchToken);

  useEffect(() => {
    dispatch(fetchPrs(t));
  }, [dispatch, t]);

  console.log(prs)

  // set PRs to state organized by time period in which the PR was set
  useEffect(() => {
    // temporary variables for sorted prs
    let lastMonth: SortedPrsRange = [];
    let lastYear: SortedPrsRange = [];
    let allTime: SortedPrsRange = [];
    // loop through prs, and partition by date
    if (prs.length) {
      prs.forEach(pr => {
        const diff: number = Number(
          m().diff(m(pr.date, "MMM DD YYYY"), "days")
        );
        if (diff <= 31) {
          lastMonth = [...lastMonth, pr];
        } else if (diff <= 365) {
          lastYear = [...lastYear, pr];
        } else {
          allTime = [...allTime, pr];
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
  }, [prs]);

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
