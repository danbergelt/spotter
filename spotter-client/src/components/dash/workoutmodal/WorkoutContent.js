import React from "react";
import WorkoutData from "./data/WorkoutData";
import WorkoutOptions from "./options/WorkoutOptions";

const WorkoutContent = () => {
  return (
    <div className="workout-body-container">
      <WorkoutData />
      <WorkoutOptions />
    </div>
  );
};

export default WorkoutContent;
