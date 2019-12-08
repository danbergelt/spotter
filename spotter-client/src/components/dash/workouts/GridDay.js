import React from "react";

const GridDay = React.memo(({ date, i, openAddWorkoutModal }) => {
  return (
    <div onClick={() => openAddWorkoutModal(date)} className="month-grid-day">
      {i <= 6 && (
        <div className="month-grid-day-of-week">{date.format("ddd")}</div>
      )}
      <div>{date.format("D")}</div>
    </div>
  );
});

export default GridDay;
