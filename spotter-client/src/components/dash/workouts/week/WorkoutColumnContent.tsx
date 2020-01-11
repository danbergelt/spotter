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
      <section
        className="week-workouts-day"
        data-testid={date.format("MMM DD YYYY")}
      >
        <p className="week-workout-day-slug">{date.format("ddd")}</p>
        <p className="week-workout-day-date">{date.format("D")}</p>
      </section>
      <div
        data-testid={i === 0 && "modal-click"}
        onClick={() => openAddWorkoutModal(date)}
        className="week-workouts-add-workout"
        role="button"
      >
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
    </>
  );
};

export default memo(WorkoutColumnContent);
