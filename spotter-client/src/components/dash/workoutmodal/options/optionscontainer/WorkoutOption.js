import React from "react";

const WorkoutOption = React.memo(({ text, icon, action, testing }) => {
  return (
    <div
      onClick={() => action && action(true)}
      data-testid={testing}
      className="add-workout-options-button"
    >
      {icon} {text}
    </div>
  );
});

export default WorkoutOption;
