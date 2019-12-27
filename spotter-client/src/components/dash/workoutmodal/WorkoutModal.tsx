import React, { memo } from "react";
import Modal from "react-modal";
import WorkoutTitle from "./data/WorkoutTitle";
import WorkoutContent from "./data/WorkoutContent";
import { mStyles } from "../workouts/modalStyles";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

interface Props {
  modal: boolean;
  closeModal: () => void;
  time: number;
}

// component for both adding a workout and viewing a saved workout
// populates with appropriate content depending on global modal context (found in global store)
const WorkoutModal: React.FC<Props> = ({ modal, closeModal, time }) => {
  return (
    <Modal
      contentLabel="Add Workout Modal"
      isOpen={modal}
      style={mStyles}
      data-testid="modal"
    >
      <div className="workout-modal-content">
        <WorkoutTitle closeModal={closeModal} />
        <WorkoutContent closeModal={closeModal} time={time} />
      </div>
    </Modal>
  );
};

export default memo(WorkoutModal);