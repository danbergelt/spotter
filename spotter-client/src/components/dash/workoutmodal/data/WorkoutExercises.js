import React from "react";
import { FiStar } from "react-icons/fi";
import ExerciseForm from "./ExerciseForm";
import WorkoutExercise from "./WorkoutExercise";
import { WorkoutDataConsumer } from "../../../../contexts/workoutDataContext";

const WorkoutExercises = () => {
  return (
    <WorkoutDataConsumer>
      {context => (
        <div className="workout-data-exercises">
          <div className="workout-data-exercises-head">
            <FiStar className="workout-data-exercises-icon" />
            <div className="workout-data-exercises-title">Exercises</div>
          </div>
          <div className="workout-data-exercises-content">
            <ExerciseForm addExercise={context.addExercise} />
            <div className="workout-data-exercises-list">
              {context.exercises.map((exercise, i) => (
                <WorkoutExercise key={i} i={i} exercise={exercise}/>
              ))}
            </div>
          </div>
        </div>
      )}
    </WorkoutDataConsumer>
  );
};

export default WorkoutExercises;
