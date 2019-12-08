import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const GridDay = React.memo(
  ({ date, i, openAddWorkoutModal, openViewModal, workouts }) => {
    return (
      <div className="month-grid-day" data-testid={date.format("MMM DD YYYY")}>
        {i <= 6 ? (
          <>
            <div className="month-grid-day-head">
              <div className="month-grid-day-of-week">{date.format("ddd")}</div>
              <div
                onClick={() => openAddWorkoutModal(date)}
                className="month-grid-add-workout"
              >
                <FiPlusCircle />
              </div>
            </div>
            <div>{date.format("D")}</div>
          </>
        ) : (
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
            <div>{date.format("D")}</div>
          </>
        )}
        {workouts
          .filter(el => el.date === date.format("MMM DD YYYY"))
          .map(data => (
            <div
              style={{ background: data.tags[0] && data.tags[0].color }}
              className="month-grid-workout"
              onClick={() => openViewModal(data, date)}
              key={data._id}
            >
              {data.title}
            </div>
          ))}
      </div>
    );
  }
);

export default GridDay;
