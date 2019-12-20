import React from "react";

const ExerciseActions = React.memo(
  ({ exercise, i, handleQueue, delExercise }) => {
    return (
      <div className="exercise-actions">
        <div
          data-testid="del-ex"
          onClick={() => delExercise(i)}
          className="exercise-edit"
        >
          Delete
        </div>
        <div onClick={() => handleQueue(exercise, i)} className="exercise-edit">
          Edit
        </div>
      </div>
    );
  }
);

export default ExerciseActions;
