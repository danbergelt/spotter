import React, { useCallback } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  QUEUE_EDIT,
  DEL_EXERCISE
} from "../../../../../actions/workoutActions";
import ExerciseActions from "./ExerciseActions";

const WorkoutExercise = ({ exercise, i, a }) => {
  const dispatch = useDispatch();

  const handleQueue = useCallback((exercise, i, a) => {
    dispatch({ type: QUEUE_EDIT, payload: { exercise, i } });
    a.current.focus();
  }, [dispatch]);

  const deleteExercise = useCallback(
    i => {
      dispatch({ type: DEL_EXERCISE, payload: i });
    },
    [dispatch]
  );

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
          <ExerciseActions
            a={a}
            onQueue={handleQueue}
            onDelete={deleteExercise}
            i={i}
            exercise={exercise}
          />
        </div>
      </div>
    )
  );
};

export default WorkoutExercise;
