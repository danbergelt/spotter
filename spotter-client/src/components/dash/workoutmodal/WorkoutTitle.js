import React from "react";
import { FiX } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

const WorkoutTitle = ({ closeModal, title, workoutTitle }) => {
  return (
    <div className="workout-modal-head">
      <div className="workout-modal-head-left">
        <FaCircle className="workout-spotter-logo" />
        <input
          placeholder={"Click to enter a title..."}
          value={title}
          onChange={e => workoutTitle(e.target.value)}
          className="workout-title"
        />
      </div>
      <div onClick={closeModal} className="workout-exit-modal">
        <FiX data-testid="exit-modal"/>
      </div>
    </div>
  );
};

export default WorkoutTitle;
