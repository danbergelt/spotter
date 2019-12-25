import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrs } from "../actions/prActions";
import * as Moment from "moment";
import { extendMoment, MomentRange } from "moment-range";
import PrSection from "../components/prs/PrSection";
import { State } from "src/types/State";
import { SortedPrs, SortedPr } from "../types/Prs";

const moment: MomentRange = extendMoment(Moment);

const Prs: React.FC = () => {
  const dispatch = useDispatch();
  const [sortedPrs, setSortedPrs] = useState<SortedPrs>({
    lastMonth: [],
    lastYear: [],
    allTime: []
  });

  const getPrs = (state: State) => state.prsReducer.prs;
  const prs: object = useSelector(getPrs);
  const fetchToken = (state: State) => state.globalReducer.t;
  const t: string | null = useSelector(fetchToken);

  useEffect((): void => {
    dispatch(fetchPrs(t));
  }, [dispatch, t]);

  // set PRs to state organized by time period in which the PR was set
  useEffect(() => {
    // temporary variables for sorted prs
    let lastMonth: SortedPr = [];
    let lastYear: SortedPr = [];
    let allTime: SortedPr = [];
    // if the prs are fetched
    if (Object.keys(prs).length) {
      for (let pr in prs) {
        // find the diff between the current date and the current pr
        let diff: number = Number(
          moment().diff(moment(prs[pr].date, "MMM DD YYYY"), "days")
        );
        if (diff <= 31) {
          lastMonth = [...lastMonth, prs[pr]];
        } else if (diff <= 365) {
          lastYear = [...lastYear, prs[pr]];
        } else {
          allTime = [...allTime, prs[pr]];
        }
      }
    }
    setSortedPrs({
      lastMonth,
      lastYear,
      allTime
    });
  }, [prs]);

  return (
    <div className="prs-container spacer">
      <PrSection title={"Last Month"} prs={sortedPrs.lastMonth} />
      <PrSection title={"Last Year"} prs={sortedPrs.lastYear} />
      <PrSection title={"All Time"} prs={sortedPrs.allTime} />
    </div>
  );
};

export default Prs;
