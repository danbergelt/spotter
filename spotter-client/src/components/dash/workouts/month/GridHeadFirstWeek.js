import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const GridHeadFirstWeek = React.memo(
  ({ date, openAddWorkoutModal, i, moment }) => {
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
          style={{ fontSize: "1.5rem" }}
          className={
            date.format("MMM DD YYYY") === moment().format("MMM DD YYYY")
              ? "today-date"
              : undefined
          }
        >
          {date.format("D") === 1 ? date.format("MMM D") : date.format("D")}
        </div>
      </>
    );
  }
);

export default GridHeadFirstWeek;
