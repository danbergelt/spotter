import React from "react";

const WorkoutOption = ({ text, icon }) => {
  return (
    <div className="add-workout-options-button">
      {icon} {text}
    </div>
  );
};

export default WorkoutOption;
