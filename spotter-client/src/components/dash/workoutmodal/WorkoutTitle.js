import React from "react";
import { FiX } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

const WorkoutTitle = ({ closeModal, title, workoutTitle }) => {

  return (
    <div className="add-workout-modal-head">
      <div className="add-workout-modal-head-left">
        <FaCircle className="add-workout-spotter-logo" />
        <input
          placeholder={"Enter a title..."}
          value={title}
          onChange={e => workoutTitle(e.target.value)}
          className="add-workout-title"
        />
      </div>
      <div onClick={closeModal} className="add-workout-exit-modal">
        <FiX />
      </div>
    </div>
  );
};

export default WorkoutTitle;
