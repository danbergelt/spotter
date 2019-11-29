import React from "react";

const WorkoutOption = ({ text, icon, action, testing }) => {
  return (
    <div
      onClick={action}
      data-testid={testing}
      className="add-workout-options-button"
    >
      {icon} {text}
    </div>
  );
};

export default WorkoutOption;
