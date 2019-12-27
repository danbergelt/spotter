import React from "react";
import { FaCircle } from "react-icons/fa";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { Pr as P } from "src/types/Prs";

const moment = extendMoment(Moment);
let m = require("moment")
if ("default" in m) {
  m = moment["default"];
}

interface Props {
  pr: P;
}


const Pr: React.FC<Props> = ({ pr }) => {
  const setClassName = (pr: P): string | undefined => {

    const diff: number = m().diff(m(pr.date, "MMM DD YYYY"), "days");

    if (diff <= 31) {
      return "pr-circle lastMonth";
    } else if (31 < diff && diff <= 365) {
      return "pr-circle lastYear";
    } else if (diff > 365) {
      return "pr-circle allTime";
    } else {
      return undefined;
    }
  };

  return (
    <div className="pr">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          // color-coding circle to indicate if a PR is recent or old
          className={setClassName(pr)}
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
