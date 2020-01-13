import React, { memo } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Moment } from "moment";
import { MomentRange } from "moment-range";

// Hacky fix to resolve error with default imports from moment and typescript
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
