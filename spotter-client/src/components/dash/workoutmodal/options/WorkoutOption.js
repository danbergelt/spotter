import React from "react";

const WorkoutOption = ({ text, icon, action }) => {
  return (
    <div onClick={action} className="add-workout-options-button">
      {icon} {text}
    </div>
  );
};

export default WorkoutOption;
