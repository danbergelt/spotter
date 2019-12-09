import React from "react";

const GridWorkout = React.memo(({ data, openViewModal, date }) => {
  return (
    <div
      style={{ background: data.tags[0] && data.tags[0].color }}
      className="month-grid-workout"
      onClick={() => openViewModal(data, date)}
      key={data._id}
    >
      {data.title}
    </div>
  );
});

export default GridWorkout;
