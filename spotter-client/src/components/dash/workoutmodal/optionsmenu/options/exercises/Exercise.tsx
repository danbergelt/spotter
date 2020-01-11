import React, { memo } from "react";
import { FiX } from "react-icons/fi";
import { Exercise as E } from '../../../../../../types/ExerciseOption';

interface Props { 
  deleteExercise: (id: string) => Promise<void>
  exercise: E
}

const Exercise: React.FC<Props> = ({ deleteExercise, exercise }) => {
  return (
    <div className="exercise-container">
      <div className="exercise">{exercise.name}</div>
      <div
        role="button"
        onClick={() => deleteExercise && deleteExercise(exercise._id)}
        className="exercise-delete"
        data-testid="exercise-delete"
      >
        <FiX />
      </div>
    </div>
  );
};

export default memo(Exercise);
