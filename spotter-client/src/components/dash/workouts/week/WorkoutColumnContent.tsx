import React, { memo } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Moment } from "moment";

// includes the add workout button and date details (e.g. --> day of week, month, etc.)

interface Props {
  date: Moment;
  openAddWorkoutModal: (date: Moment) => void;
  i: number;
}

const WorkoutColumnContent: React.FC<Props> = ({
  date,
  openAddWorkoutModal,
  i
}) => {
  return (
    <>
      <div
        className="week-workouts-day"
        data-testid={date.format("MMM DD YYYY")}
      >
        <div className="week-workout-day-slug">{date.format("ddd")}</div>
        <div className="week-workout-day-date">{date.format("D")}</div>
      </div>
      <div
        data-testid={i === 0 && "modal-click"}
        onClick={() => openAddWorkoutModal(date)}
        className="week-workouts-add-workout"
      >
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
    </>
  );
};

export default memo(WorkoutColumnContent);
