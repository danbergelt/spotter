import React from "react";
import { FiArrowRight, FiTrash, FiEdit } from "react-icons/fi";

const WorkoutExercise = ({ exercise, i }) => {
  return (
    <div className={i % 2 === 0 ? "exercise-row even" : "exercise-row odd"}>
      <div className="exercise-results">
        <div className="exercise-name">
          {exercise.exercise}
          <div className="exercise-actions">
            <div className="exercise-del">Edit</div>
            <div className="exercise-edit">Del</div>
          </div>
        </div>
        <div className="exercise-stats">
          {exercise.weight && (
            <div className="exercise-stat">{exercise.weight} lbs</div>
          )}
          {exercise.weight && exercise.reps && exercise.sets && (
            <FiArrowRight />
          )}
          {exercise.reps && (
            <div style={{ paddingLeft: "1rem" }} className="exercise-stat">
              {exercise.reps} reps
            </div>
          )}
          {exercise.reps && exercise.sets && (
            <div className="exercise-stat">x</div>
          )}
          {exercise.sets && (
            <div className="exercise-stat">{exercise.sets} sets</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutExercise;
