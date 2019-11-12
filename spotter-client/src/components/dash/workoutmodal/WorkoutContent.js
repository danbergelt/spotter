import React from "react";
import WorkoutData from "./data/WorkoutData";
import WorkoutOptions from "./options/WorkoutOptions";

const WorkoutContent = () => {
  return (
    <div className="add-workout-body-container">
      <WorkoutData />
      <WorkoutOptions />
    </div>
  );
};

export default WorkoutContent;
