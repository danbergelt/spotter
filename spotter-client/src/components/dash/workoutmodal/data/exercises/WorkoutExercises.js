import React, { useCallback } from "react";
import { FiStar } from "react-icons/fi";
import ExerciseForm from "../exerciseform/ExerciseForm";
import { useSelector, useDispatch } from "react-redux";
import {
  QUEUE_EDIT,
  DEL_EXERCISE
} from "../../../../../actions/workoutActions";
import WorkoutExercise from "./WorkoutExercise";
import { times } from "lodash";
import ClearEditQueue from "./ClearEditQueue";

const WorkoutExercises = () => {
  const exercises = useSelector(state => state.workoutReducer.exercises);

  const dispatch = useDispatch();

  // refs to handle blurring fields
  const refs = [];
  times(4, i => (refs[i] = React.createRef()));

  const handleQueue = useCallback(
    (exercise, i, a) => {
      dispatch({ type: QUEUE_EDIT, payload: { exercise, i } });
      a.current.focus();
    },
    [dispatch]
  );

  const delExercise = useCallback(
    i => {
      dispatch({ type: DEL_EXERCISE, payload: i });
    },
    [dispatch]
  );

  return (
    <div className="workout-data-exercises">
      <div className="workout-data-exercises-head">
        <FiStar className="workout-data-exercises-icon" />
        <div className="workout-data-exercises-title">Exercises</div>
        <ClearEditQueue />
      </div>
      <div className="workout-data-exercises-content">
        <ExerciseForm refs={refs} />
        <div className="workout-data-exercises-list">
          {exercises.map((exercise, i) => (
            <WorkoutExercise
              a={refs[0]}
              key={i}
              i={i}
              exercise={exercise}
              handleQueue={handleQueue}
              delExercise={delExercise}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutExercises;
