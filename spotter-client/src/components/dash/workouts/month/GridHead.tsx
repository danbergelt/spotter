import React, { memo } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Moment } from "moment";
import { MomentRange } from "moment-range";

let m = require("moment")
if ("default" in m) {
  m = m["default"];
}

interface Props {
  openAddWorkoutModal: (date: Moment) => void;
  date: Moment;
  moment: MomentRange &
    typeof import("/Users/dan/Documents/prod/spotter/spotter-client/node_modules/moment/moment");
}

const GridHead: React.FC<Props> = ({ openAddWorkoutModal, date }) => {

  // if ("default" in moment) {
  //   var momentFunc: any = moment["default"];
  // }

  return (
    <>
      <div className="month-grid-day-head">
        <div
          onClick={() => openAddWorkoutModal(date)}
          style={{ marginLeft: "auto" }}
          className="month-grid-add-workout"
        >
          <FiPlusCircle />
        </div>
      </div>
      <div
        style={{ fontSize: "1.3rem" }}
        className={
          date.format("MMM DD YYYY") === m().format("MMM DD YYYY")
            ? "today-date"
            : undefined
        }
      >
        {date.format("D")}
      </div>
    </>
  );
};

export default memo(GridHead);
