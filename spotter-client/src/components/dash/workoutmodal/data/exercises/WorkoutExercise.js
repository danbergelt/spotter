import React from "react";
import { FiArrowRight } from "react-icons/fi";
import ExerciseActions from "./ExerciseActions";

const WorkoutExercise = React.memo(
  ({ exercise, i, a, handleQueue, delExercise }) => {
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
                  <div
                    style={{ paddingLeft: "1rem" }}
                    className="exercise-stat"
                  >
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
              i={i}
              exercise={exercise}
              handleQueue={handleQueue}
              delExercise={delExercise}
            />
          </div>
        </div>
      )
    );
  }
);

export default WorkoutExercise;
