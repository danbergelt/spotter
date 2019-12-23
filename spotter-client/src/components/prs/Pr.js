import React from "react";
import { FaCircle } from "react-icons/fa";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const Pr = ({ pr }) => {
  return (
    <div className="pr">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          // color-coding circle to indicate if a PR is recent or old
          className={
            (moment().diff(moment(pr.date, "MMM DD YYYY"), "days") <= 31 &&
              "pr-circle lastMonth") ||
            (31 < moment().diff(moment(pr.date, "MMM DD YYYY"), "days") &&
              moment().diff(moment(pr.date, "MMM DD YYYY"), "days") <= 365 &&
              "pr-circle lastYear") ||
            (moment().diff(moment(pr.date, "MMM DD YYYY"), "days") > 365 &&
              "pr-circle allTime")
          }
        >
          <FaCircle />
        </div>
        <div>{pr.name}</div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="pr-date">{pr.date}</div>
        <div style={{ fontWeight: "bold" }}>{pr.pr}lbs</div>
      </div>
    </div>
  );
};

export default Pr;
