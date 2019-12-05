import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const WorkoutColumnContent = React.memo(({ date, openAddWorkoutModal, i }) => {
  return (
    <>
      <div className="week-workouts-day">
        <div className="week-workout-day-slug">{date.format("ddd")}</div>
        <div className="week-workout-day-date">
          {date.format("MMM DD YYYY")}
        </div>
      </div>
      <div
        data-testid={i === 0 && "modal-click"}
        onClick={openAddWorkoutModal}
        className="week-workouts-add-workout"
      >
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
    </>
  );
});

export default WorkoutColumnContent;
