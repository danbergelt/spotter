import React, { memo } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Moment } from "moment";
import { MomentRange } from "moment-range";

interface Props {
  date: Moment;
  openAddWorkoutModal: (date: Moment) => void;
  i: number;
  moment: MomentRange &
    typeof import("/Users/dan/Documents/prod/spotter/spotter-client/node_modules/moment/moment");
}

const GridHeadFirstWeek: React.FC<Props> = ({
  date,
  openAddWorkoutModal,
  i,
  moment
}) => {

  if ("default" in moment) {
    var momentFunc: any = moment["default"];
  }

  return (
    <>
      <div className="month-grid-day-head">
        <div className="month-grid-day-of-week">{date.format("ddd")}</div>
        <div
          onClick={() => openAddWorkoutModal(date)}
          className="month-grid-add-workout"
          data-testid={i === 0 && "add-for-testing"}
        >
          <FiPlusCircle />
        </div>
      </div>
      <div
        style={{ fontSize: "1.3rem" }}
        className={
          date.format("MMM DD YYYY") === momentFunc().format("MMM DD YYYY")
            ? "today-date"
            : undefined
        }
      >
        {date.format("D") as any === 1 ? date.format("MMM D") : date.format("D")}
      </div>
    </>
  );
};

export default memo(GridHeadFirstWeek);
