import React, { useRef } from "react";
import { FiStar } from "react-icons/fi";
import ExerciseForm from "./ExerciseForm";
import WorkoutExercise from "./WorkoutExercise";
import { WorkoutDataConsumer } from "../../../../contexts/workoutDataContext";

const WorkoutExercises = () => {

  // refs to handle blurring fields
  const a = useRef(null);
  const b = useRef(null);
  const c = useRef(null);
  const d = useRef(null);

  return (
    <WorkoutDataConsumer>
      {context => (
        <div className="workout-data-exercises">
          <div className="workout-data-exercises-head">
            <FiStar className="workout-data-exercises-icon" />
            <div className="workout-data-exercises-title">Exercises</div>
          </div>
          <div className="workout-data-exercises-content">
            <ExerciseForm
              a={a}
              b={b}
              c={c}
              d={d}
              addExercise={context.addExercise}
            />
            <div className="workout-data-exercises-list">
              {context.exercises.map((exercise, i) => (
                <WorkoutExercise a={a} key={i} i={i} exercise={exercise} />
              ))}
            </div>
          </div>
        </div>
      )}
    </WorkoutDataConsumer>
  );
};

export default WorkoutExercises;
