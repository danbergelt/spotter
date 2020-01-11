import React, { memo } from "react";
import { Props } from '../../../../../types/Exercises';

// either delete or edit an exercise

const ExerciseActions: React.FC<Props> = ({
  exercise,
  i,
  handleQueue,
  delExercise
}) => {
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
};

export default memo(ExerciseActions);
