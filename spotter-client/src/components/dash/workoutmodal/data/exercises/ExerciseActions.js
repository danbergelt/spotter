import React from "react";

const ExerciseActions = React.memo(({ exercise, onQueue, a, onDelete, i }) => {
  return (
    <div className="exercise-actions">
      <div
        data-testid="del-ex"
        onClick={() => onDelete(i)}
        className="exercise-edit"
      >
        Delete
      </div>
      <div onClick={() => onQueue(exercise, i, a)} className="exercise-edit">
        Edit
      </div>
    </div>
  );
});

export default ExerciseActions;
