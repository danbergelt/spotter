import React, { useCallback } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { QUEUE_EDIT, DEL_EXERCISE } from "../../../../actions/workoutActions";

const WorkoutExercise = ({ exercise, i, a }) => {
  const dispatch = useDispatch();

  const delExercise = useCallback(i => {
    dispatch({ type: DEL_EXERCISE, payload: i });
  }, [dispatch]);

  const queueEdit = useCallback((exercise, i) => {
    dispatch({ type: QUEUE_EDIT, payload: { exercise, i } });
  }, [dispatch]);

  const handleQueue = (exercise, i) => {
    queueEdit(exercise, i);
    a.current.focus();
  };

  return (
    exercise && (
      <div className={i % 2 === 0 ? "exercise-row even" : "exercise-row odd"}>
        <div className="exercise-results">
          <div>
            <div className="exercise-name">{exercise.name}</div>
            <div className="exercise-stats">
              {exercise.weight && (
                <div className="exercise-stat">{exercise.weight} lbs</div>
              )}
              {exercise.weight && exercise.reps && exercise.sets && (
                <FiArrowRight />
              )}
              {exercise.sets && (
                <div style={{ paddingLeft: "1rem" }} className="exercise-stat">
                  {exercise.sets} sets
                </div>
              )}
              {exercise.reps && exercise.sets && (
                <div className="exercise-stat">x</div>
              )}
              {exercise.reps && (
                <div className="exercise-stat">{exercise.reps} reps</div>
              )}
            </div>
          </div>
          <div className="exercise-actions">
            <div
              data-testid="del-ex"
              onClick={() => delExercise(i)}
              className="exercise-edit"
            >
              Delete
            </div>
            <div
              onClick={() => handleQueue(exercise, i)}
              className="exercise-edit"
            >
              Edit
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WorkoutExercise;
