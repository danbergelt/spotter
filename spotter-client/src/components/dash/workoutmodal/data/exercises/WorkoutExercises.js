import React from "react";
import { FiStar } from "react-icons/fi";
import ExerciseForm from "../exerciseform/ExerciseForm";
import { useSelector, useDispatch } from "react-redux";
import { RESET_QUEUE } from "../../../../../actions/workoutActions";
import WorkoutExercise from "./WorkoutExercise";
import { isEmpty, times } from "lodash";

const WorkoutExercises = () => {
  const queued = useSelector(state => state.workoutReducer.queue);
  const exercises = useSelector(state => state.workoutReducer.exercises);

  const dispatch = useDispatch();

  // refs to handle blurring fields
  const refs = [];
  times(4, i => (refs[i] = React.createRef()));

  return (
    <div className="workout-data-exercises">
      <div className="workout-data-exercises-head">
        <FiStar className="workout-data-exercises-icon" />
        <div className="workout-data-exercises-title">Exercises</div>
        {!isEmpty(queued) && (
          <div
            onClick={() => dispatch({ type: RESET_QUEUE })}
            className="workout-data-exercises-editing"
          >
            Clear
          </div>
        )}
      </div>
      <div className="workout-data-exercises-content">
        <ExerciseForm refs={refs} />
        <div className="workout-data-exercises-list">
          {exercises.map((exercise, i) => (
            <WorkoutExercise a={refs[0]} key={i} i={i} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutExercises;
