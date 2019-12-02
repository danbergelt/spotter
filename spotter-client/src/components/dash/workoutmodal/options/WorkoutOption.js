import React from "react";

const WorkoutOption = ({ dispatch, types, text, icon, action, testing }) => {
  return (
    <div
      onClick={() => action && action(dispatch, types, true)}
      data-testid={testing}
      className="add-workout-options-button"
    >
      {icon} {text}
    </div>
  );
};

export default WorkoutOption;
