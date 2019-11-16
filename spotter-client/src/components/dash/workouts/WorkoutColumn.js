import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import AddWorkout from "./AddWorkout";
import { connect } from "react-redux";
import { resetWorkout } from "../../../actions/addWorkoutActions";

const WorkoutColumn = ({ date, resetWorkout, i }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeAddWorkoutModal = () => {
    setModal(false);
    resetWorkout();
  };

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
    </div>
  );
};

export default connect(
  null,
  { resetWorkout }
)(WorkoutColumn);
