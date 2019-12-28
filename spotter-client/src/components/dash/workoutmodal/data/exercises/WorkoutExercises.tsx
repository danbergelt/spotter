import React, { useCallback } from "react";
import { FiStar } from "react-icons/fi";
import ExerciseForm from "../exerciseform/ExerciseForm";
import { useSelector, useDispatch } from "react-redux";
import {
  QUEUE_EDIT,
  DEL_EXERCISE
} from "../../../../../actions/workoutActions";
import WorkoutExercise from "./WorkoutExercise";
import { times, isEmpty } from "lodash";
import ClearEditQueue from "./ClearEditQueue";
import { State } from "src/types/State";
import { Refs, Exercise, Queued } from "../../../../../types/Exercises";

type HandleQueue = (exercise: Exercise, i: number) => void;

type DelExercise = (i: number) => void;

const WorkoutExercises = () => {
  const fetchExercises = (state: State) => state.workoutReducer.exercises;
  const exercises: Array<Exercise> = useSelector(fetchExercises);
  const fetchQueued = (state: State) => state.workoutReducer.queue;
  const queued: Queued = useSelector(fetchQueued) as Queued;

  const dispatch = useDispatch();

  // refs to handle blurring fields
  const refs: Refs = [];
  times(3, i => (refs[i] = React.createRef()));

  const handleQueue: HandleQueue = useCallback(
    (exercise, i) => {
      dispatch<{ type: string; payload: { exercise: Exercise; i: number } }>({
        type: QUEUE_EDIT,
        payload: { exercise, i }
      });
    },
    [dispatch]
  );

  const delExercise: DelExercise = useCallback(
    i => {
      dispatch<{ type: string; payload: number }>({
        type: DEL_EXERCISE,
        payload: i
      });
    },
    [dispatch]
  );

  return (
    <div className="workout-data-exercises">
      <div className="workout-data-exercises-head">
        <FiStar className="workout-data-exercises-icon" />
        <div className="workout-data-exercises-title">Workout</div>
        {!isEmpty(queued) && <ClearEditQueue />}
      </div>
      <div className="workout-data-exercises-content">
        <ExerciseForm refs={refs} />
        <div className="workout-data-exercises-list">
          {exercises.map((exercise, i) => (
            <WorkoutExercise
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
