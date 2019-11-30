import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { connect } from "react-redux";
import { delExercise } from "../../../../actions/workoutActions";

const WorkoutExercise = ({ exercise, i, delExercise }) => {
  return (
    exercise && (
      <div className={i % 2 === 0 ? "exercise-row even" : "exercise-row odd"}>
        <div className="exercise-results">
          <div className="exercise-name">{exercise.name}</div>
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
          <div className="exercise-actions">
            <div className="exercise-del">Edit</div>
            <div onClick={() => delExercise(i)} className="exercise-edit">
              Del
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default connect(null, { delExercise })(WorkoutExercise);
