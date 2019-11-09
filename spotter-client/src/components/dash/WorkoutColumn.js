import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const WorkoutColumn = ({ date }) => {
  return (
    <div className="week-workouts-column">
      <div className="week-workouts-day">
        <div className="week-workout-day-slug">{date.format("ddd")}</div>
        <div>{date.format("MMM DD")}</div>
      </div>
      <div className="week-workouts-add-workout">
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
    </div>
  );
};

export default WorkoutColumn;
