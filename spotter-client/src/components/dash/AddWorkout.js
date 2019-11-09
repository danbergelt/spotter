import React from "react";
import Modal from "react-modal";
import { FiX } from 'react-icons/fi';

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "750px",
    margin: "0 auto"
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
        <div onClick={closeModal} className="add-workout-exit-modal"><FiX /></div>
      </div>
    </Modal>
  );
};

export default AddWorkout;
