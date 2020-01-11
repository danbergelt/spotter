import React, { memo } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Moment } from "moment";
import { MomentRange } from "moment-range";

// HACKY - Moment default imports don't work very well with typescript, so need to import this way to satisfy TS errors
let m = require("moment");
if ("default" in m) {
  m = m["default"];
}

interface Props {
  openAddWorkoutModal: (date: Moment) => void;
  date: Moment;
  moment: MomentRange &
    typeof import("/Users/dan/Documents/prod/spotter/spotter-client/node_modules/moment/moment");
}

// includes the button to add a new workout

const GridHead: React.FC<Props> = ({ openAddWorkoutModal, date }) => {
  return (
    <>
      <section className="month-grid-day-head">
        <div
          role="button"
          onClick={() => openAddWorkoutModal(date)}
          style={{ marginLeft: "auto" }}
          className="month-grid-add-workout"
        >
          <FiPlusCircle />
        </div>
      </section>
      <p
        style={{ fontSize: "1.3rem" }}
        className={
          date.format("MMM DD YYYY") === m().format("MMM DD YYYY")
            ? "today-date"
            : undefined
        }
      >
        {date.format("D")}
      </p>
    </>
  );
};

export default memo(GridHead);
