import React, { memo } from "react";
import { Workout } from "src/types/Workout";
import { Moment } from "moment";

interface Props {
  data: Workout;
  openViewModal: (workout: Workout, date: Moment) => void;
  date: Moment;
}

// prompt to view a pre-existing workout

const GridWorkout: React.FC<Props> = ({ data, openViewModal, date }) => {
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
};

export default memo(GridWorkout);
