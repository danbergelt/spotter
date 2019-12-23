import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrs } from "../actions/prActions";
import Moment from "moment";
import { extendMoment } from "moment-range";
import PrSection from "../components/prs/PrSection";

const moment = extendMoment(Moment);

const Prs = () => {
  const dispatch = useDispatch();
  const [sortedPrs, setSortedPrs] = useState({
    lastMonth: [],
    lastYear: [],
    allTime: []
  });

  const prs = useSelector(state => state.prsReducer.prs);
  const t = useSelector(state => state.globalReducer.t);

  useEffect(() => {
    dispatch(fetchPrs(t));
  }, [dispatch, t]);

  useEffect(() => {
    // temporary variables for sorted prs
    let lastMonth = [];
    let lastYear = [];
    let allTime = [];
    // if the prs are fetched
    if (Object.keys(prs).length) {
      for (let pr in prs) {
        // find the diff between the current date and the current pr
        let diff = Number(
          moment().diff(moment(prs[pr].date, "MMM DD YYYY"), "days")
        );
        if (diff <= 31) {
          lastMonth.push(prs[pr]);
        } else if (diff <= 365) {
          lastYear.push(prs[pr]);
        } else {
          allTime.push(prs[pr]);
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
