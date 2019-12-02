import React from "react";
import Modal from "react-modal";
import styles from "../../../styles/variables.scss";
import WorkoutTitle from "../workoutmodal/data/WorkoutTitle";
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

const WorkoutModal = ({ modal, closeModal, week, date }) => {
  return (
    <Modal
      contentLabel="Add Workout Modal"
      isOpen={modal}
      style={customStyles}
      data-testid="modal"
    >
      <div className="workout-modal-content">
        <WorkoutTitle closeModal={closeModal} />
        <WorkoutContent date={date} closeModal={closeModal} week={week} />
      </div>
    </Modal>
  );
};

export default WorkoutModal;
