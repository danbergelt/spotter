import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrs } from "../actions/prActions";
import * as Moment from "moment";
import { extendMoment, MomentRange } from "moment-range";
import PrSection from "../components/prs/PrSection";
import { State, fetchToken } from "src/types/State";
import { SortedPrs, SortedPrsRange } from "../types/Prs";

const moment: MomentRange = extendMoment(Moment);
let m = require("moment")
if ("default" in m) {
  m = moment["default"];
}

const Prs: React.FC = () => {
  const dispatch = useDispatch();
  const [sortedPrs, setSortedPrs] = useState<SortedPrs>({
    lastMonth: [],
    lastYear: [],
    allTime: []
  });

  const getPrs = (state: State) => state.prsReducer.prs;
  const prs: object = useSelector(getPrs);
  const t: string | null = useSelector(fetchToken);

  useEffect((): void => {
    dispatch(fetchPrs(t));
  }, [dispatch, t]);

  // set PRs to state organized by time period in which the PR was set
  useEffect(() => {
    // temporary variables for sorted prs
    let lastMonth: SortedPrsRange = [];
    let lastYear: SortedPrsRange = [];
    let allTime: SortedPrsRange = [];
    // if the prs are fetched
    if (Object.keys(prs).length) {

      // if ("default" in moment) {
      //   var momentDefault: any = moment["default"];
      // }

      for (let pr in prs) {
        // find the diff between the current date and the current pr
        let diff: number = Number(
          m().diff(m(prs[pr].date, "MMM DD YYYY"), "days")
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
