import React from "react";
import { FiX } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { addWorkoutTitle } from "../../../../actions/workoutActions";

const WorkoutTitle = ({ closeModal, title, addWorkoutTitle }) => {
  return (
    <div className="workout-modal-head">
      <div className="workout-modal-head-left">
        <FaCircle className="workout-spotter-logo" />
        <input
          placeholder={"Click to enter a title..."}
          value={title}
          onChange={e => addWorkoutTitle(e.target.value)}
          className="workout-title"
        />
      </div>
      <div onClick={closeModal} className="workout-exit-modal">
        <FiX data-testid="exit-modal" />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    title: state.workoutReducer.title
  };
};

export default connect(mapStateToProps, { addWorkoutTitle })(WorkoutTitle);
