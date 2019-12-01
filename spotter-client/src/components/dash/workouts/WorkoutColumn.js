import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import WorkoutModal from "./WorkoutModal";
import { connect } from "react-redux";
import { setCtx } from "../../../actions/ctxActions";
import {
  resetWorkout,
  resetQueue,
  fromSaved
} from "../../../actions/workoutActions";
import { resetTags } from "../../../actions/tagsActions";
import WorkoutCard from "./WorkoutCard";

const WorkoutColumn = ({
  date,
  resetWorkout,
  i,
  workouts,
  resetTags,
  resetQueue,
  setCtx,
  fromSaved
}) => {
  const [modal, setModal] = useState(false);
  const [workout, setWorkout] = useState([]);

  useEffect(() => {
    const workout = workouts.filter(
      el => el.date === date.format("MMM DD YYYY")
    );
    setWorkout(workout);
  }, [workouts, date]);

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
      <WorkoutModal modal={modal} closeModal={closeModal} />
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

export default connect(null, {
  resetWorkout,
  resetTags,
  resetQueue,
  setCtx,
  fromSaved
})(WorkoutColumn);
