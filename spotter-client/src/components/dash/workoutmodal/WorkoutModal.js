import React from "react";
import Modal from "react-modal";
import WorkoutTitle from "./data/WorkoutTitle";
import WorkoutContent from "./data/WorkoutContent";
import { mStyles } from '../workouts/modalStyles';

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const WorkoutModal = React.memo(({ modal, closeModal, week, date }) => {
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
});

export default WorkoutModal;
