import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import AddWorkout from "./AddWorkout";
import { connect } from "react-redux";
import { resetWorkout } from "../../../actions/addWorkoutActions";

const WorkoutColumn = ({ date, resetWorkout, i, workouts }) => {
  const [modal, setModal] = useState(false);
  const [workout, setWorkout] = useState([]);

  const openModal = () => {
    setModal(true);
  };

  const closeAddWorkoutModal = () => {
    setModal(false);
    resetWorkout();
  };

  useEffect(() => {
    const workout = workouts.filter(
      el => el.date === date.format("MMM DD YYYY")
    );
    setWorkout(workout);
  }, [workouts]);

  // const closeModal = () => {
  //   setModal(false);
  // }

  return (
    <div className="week-workouts-column">
      <div className="week-workouts-day">
        <div className="week-workout-day-slug">{date.format("ddd")}</div>
        <div>{date.format("MMM DD YYYY")}</div>
      </div>
      <div
        data-testid={i === 0 && "modal-click"}
        onClick={openModal}
        className="week-workouts-add-workout"
      >
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
      <AddWorkout modal={modal} closeModal={closeAddWorkoutModal} />
      <div>
        {workout.map(data => (
          <div key={data._id}>
            <div>{data.date}</div>
            <div>{data.title}</div>
            <div>{data.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { resetWorkout })(WorkoutColumn);
