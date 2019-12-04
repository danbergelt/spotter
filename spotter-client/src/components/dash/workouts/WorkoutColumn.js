import React, { useState, useEffect, useCallback } from "react";
import { FiPlusCircle } from "react-icons/fi";
import WorkoutModal from "./WorkoutModal";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_CTX } from "../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../actions/workoutActions";
import { RESET_TAGS } from "../../../actions/tagsActions";
import WorkoutCard from "./WorkoutCard";

const WorkoutColumn = ({ date, i, week }) => {
  const [modal, setModal] = useState(false);
  const [workout, setWorkout] = useState([]);

  const data = useSelector(state => state.fetchWorkoutsReducer);
  const { workouts } = data;

  const dispatch = useDispatch();

  const setCtx = useCallback(
    ctx => {
      dispatch({ type: MODAL_CTX, payload: ctx });
    },
    [dispatch]
  );

  const resetWorkout = useCallback(() => {
    dispatch({ type: RESET_WORKOUT });
  }, [dispatch]);

  const resetQueue = useCallback(() => {
    dispatch({ type: RESET_QUEUE });
  }, [dispatch]);

  const fromSaved = useCallback(
    workout => {
      dispatch({ type: FROM_SAVED, payload: workout });
    },
    [dispatch]
  );

  const resetTags = useCallback(() => {
    dispatch({ type: RESET_TAGS });
  }, [dispatch]);

  // set this column's workout only when the workouts array and date changes
  useEffect(() => {
    const workout = workouts.filter(
      el => el.date === date.format("MMM DD YYYY")
    );
    console.log(workout);
    setWorkout(workout);
  }, [workouts]);

  const openAddWorkoutModal = () => {
    setCtx("add");
    setModal(true);
  };

  const openViewModal = workout => {
    setCtx("view");
    fromSaved(workout);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    resetWorkout();
    resetTags();
    resetQueue();
    setCtx(null);
  };

  return (
    <div className="week-workouts-column">
      <div className="week-workouts-day">
        <div className="week-workout-day-slug">{date.format("ddd")}</div>
        <div className="week-workout-day-date">
          {date.format("MMM DD YYYY")}
        </div>
      </div>
      <div
        data-testid={i === 0 && "modal-click"}
        onClick={openAddWorkoutModal}
        className="week-workouts-add-workout"
      >
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
      <WorkoutModal
        date={date}
        week={week}
        modal={modal}
        closeModal={closeModal}
      />
      <div>
        {workout.map(data => (
          <div
            className="workout-card-container"
            onClick={() => openViewModal(data)}
            key={data._id}
          >
            <WorkoutCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutColumn;
