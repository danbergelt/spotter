import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const GridHead = React.memo(({ openAddWorkoutModal, date, moment }) => {
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
        style={{ fontSize: "1.5rem" }}
        className={
          date.format("MMM DD YYYY") === moment().format("MMM DD YYYY")
            ? "today-date"
            : undefined
        }
      >
        {date.format("D")}
      </div>
    </>
  );
});

export default GridHead;
