import React, { memo } from "react";
import { FiX } from "react-icons/fi";
import { P } from "src/types/Grid";
import { Workout } from "src/types/Workout";
import * as M from "moment";

let m = require("moment")
if ("default" in m) {
  m = m["default"];
}

interface Props {
  setPopover: React.Dispatch<React.SetStateAction<P>>;
  workouts: Array<Workout>;
  openViewModal: (workout: Workout, date: M.Moment) => void;
  date: M.Moment;
}

const ViewMoreContent: React.FC<Props> = ({
  setPopover,
  workouts,
  openViewModal,
  date
}) => {
  const handlePopover: (workout: Workout, date: M.Moment) => void = workout => {
    setPopover({ open: false, id: null });
    openViewModal(workout, date);
  };

  // if ("default" in moment) {
  //   var momentFunc: any = moment["default"];
  // }

  return (
    <>
      <div className="popover-head">
        {date.format("MMM D")}
        <div
          data-testid="close-popover"
          onClick={() => setPopover({ open: false, id: null })}
          className="close-popover"
        >
          <FiX />
        </div>
      </div>
      {workouts
        .filter(el => el.date === date.format("MMM DD YYYY"))
        .map(workout => (
          <div
            onClick={() =>
              handlePopover(workout, m(workout.date, "MMM DD YYYY"))
            }
            className="view-more-workouts-container"
            key={workout._id}
          >
            <div
              style={{ background: workout.tags[0] && workout.tags[0].color }}
              className="view-more-workout"
            >
              {workout.title}
            </div>
          </div>
        ))}
    </>
  );
};

export default memo(ViewMoreContent);
