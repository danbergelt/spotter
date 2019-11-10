import React from "react";
import Modal from "react-modal";
import styles from "../../../styles/variables.scss";

// components
import WorkoutTitle from "../workoutmodal/WorkoutTitle";
import WorkoutContent from "../workoutmodal/WorkoutContent";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "750px",
    margin: "0 auto",
    background: styles.gray3,
    border: 0
  }
};

const AddWorkout = ({ modal, closeModal }) => {
  return (
    <Modal
      contentLabel="Add Workout Modal"
      isOpen={modal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <div className="add-workout-modal-content">
        <WorkoutTitle closeModal={closeModal} />
        <WorkoutContent />
      </div>
    </Modal>
  );
};

export default AddWorkout;
