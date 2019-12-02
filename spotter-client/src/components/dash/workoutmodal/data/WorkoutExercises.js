import React from "react";
import { FiStar } from "react-icons/fi";
import ExerciseForm from "./ExerciseForm";
import { connect } from "react-redux";
import { resetQueue, addExercise } from "../../../../actions/workoutActions";
import WorkoutExercise from "./WorkoutExercise";
import { isEmpty, times } from "lodash";

const WorkoutExercises = ({ queued, resetQueue, exercises, addExercise }) => {
  // refs to handle blurring fields
  const refs = [];
  times(4, i => (refs[i] = React.createRef()));

  return (
    <div className="workout-data-exercises">
      <div className="workout-data-exercises-head">
        <FiStar className="workout-data-exercises-icon" />
        <div className="workout-data-exercises-title">Exercises</div>
        {!isEmpty(queued) && (
          <div onClick={resetQueue} className="workout-data-exercises-editing">
            Clear
          </div>
        )}
      </div>
      <div className="workout-data-exercises-content">
        <ExerciseForm refs={refs} addExercise={addExercise} />
        <div className="workout-data-exercises-list">
          {exercises.map((exercise, i) => (
            <WorkoutExercise a={refs[0]} key={i} i={i} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    queued: state.workoutReducer.queue,
    exercises: state.workoutReducer.exercises
  };
};

export default connect(mapStateToProps, { resetQueue, addExercise })(WorkoutExercises);
