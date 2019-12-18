import React from "react";
import { FiX } from "react-icons/fi";

const Exercise = React.memo(({ deleteExercise, exercise }) => {
  return (
    <div className="exercise-container">
      <div className="exercise">{exercise.name}</div>
      <div
        onClick={() => deleteExercise && deleteExercise(exercise._id)}
        className="exercise-delete"
        data-testid="exercise-delete"
      >
        <FiX />
      </div>
    </div>
  );
});

export default Exercise;
