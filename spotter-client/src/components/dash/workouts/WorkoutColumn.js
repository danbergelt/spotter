import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import AddWorkout from "./AddWorkout";
import { connect } from "react-redux";
import { resetNotes, resetTitle } from "../../../actions/addWorkoutActions";

const WorkoutColumn = ({ date, resetNotes, resetTitle }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeAddWorkoutModal = () => {
    setModal(false);
    resetNotes("");
    resetTitle("");
  };

  const closeModal = () => {
    setModal(false);
  }

  return (
    <div className="week-workouts-column">
      <div className="week-workouts-day">
        <div className="week-workout-day-slug">{date.format("ddd")}</div>
        <div>{date.format("MMM DD")}</div>
      </div>
      <div onClick={openModal} className="week-workouts-add-workout">
        {<FiPlusCircle className="week-workouts-add-icon" />} Add Workout
      </div>
      <AddWorkout modal={modal} closeModal={closeAddWorkoutModal} />
    </div>
  );
};

export default connect(
  null,
  { resetNotes, resetTitle }
)(WorkoutColumn);
