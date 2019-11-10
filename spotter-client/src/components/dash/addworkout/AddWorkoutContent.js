import React from "react";
import AddWorkoutData from "./AddWorkoutData";
import AddWorkoutOptions from "./AddWorkoutOptions";

const AddWorkoutContent = () => {
  return (
    <div className="add-workout-body-container">
      <AddWorkoutData />
      <AddWorkoutOptions />
    </div>
  );
};

export default AddWorkoutContent;
