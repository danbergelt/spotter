import React from "react";
import Modal from "react-modal";
import WorkoutTitle from "../workoutmodal/data/WorkoutTitle";
import WorkoutContent from "../workoutmodal/WorkoutContent";
import { mStyles } from './modalStyles';

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const WorkoutModal = ({ modal, closeModal, week, date }) => {
  return (
    <Modal
      contentLabel="Add Workout Modal"
      isOpen={modal}
      style={mStyles}
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
