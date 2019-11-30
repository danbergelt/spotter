import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import WorkoutModal from "./WorkoutModal";
import { connect } from "react-redux";
import { resetWorkout, resetQueue } from "../../../actions/workoutActions";
import { resetTags } from "../../../actions/tagsActions";
import WorkoutCard from "./WorkoutCard";

const WorkoutColumn = ({
  date,
  resetWorkout,
  i,
  workouts,
  resetTags,
  resetQueue
}) => {
  const [modal, setModal] = useState(false);
  const [workout, setWorkout] = useState([]);

  const openModal = () => {
    setModal(true);
  };

  const closeAddWorkoutModal = () => {
    setModal(false);
    resetWorkout();
    resetTags();
    resetQueue();
  };

  useEffect(() => {
    const workout = workouts.filter(
      el => el.date === date.format("MMM DD YYYY")
    );
    setWorkout(workout);
  }, [workouts, date]);

  // const closeModal = () => {
  //   setModal(false);
  // }

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
        onClick={openModal}
        className="week-workouts-add-workout"
      >
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
      <WorkoutModal modal={modal} closeModal={closeAddWorkoutModal} />
      <div>
        {workout.map(data => (
          <div className="workout-card-container" key={data._id}>
            <WorkoutCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { resetWorkout, resetTags, resetQueue })(
  WorkoutColumn
);
