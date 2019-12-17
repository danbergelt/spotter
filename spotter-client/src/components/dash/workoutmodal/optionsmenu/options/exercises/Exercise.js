import React from "react";
import { FiX } from "react-icons/fi";

const Exercise = React.memo(({ active, setActive, exercise }) => {
  return (
    <div className="exercise-container">
      <div className="exercise" onClick={() => setActive(exercise)}>
        {exercise.name}
      </div>
      <div
        // onClick={deleteExercise}
        className="exercise-delete"
        data-testid="exercise-delete"
      >
        <FiX />
      </div>
    </div>
  );
});

export default Exercise;
