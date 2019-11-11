import React from "react";
import Modal from "react-modal";
import styles from "../../../styles/variables.scss";
import { connect } from "react-redux";
import {
  addWorkoutTitle,
  addWorkoutNotes,
  resetNotes
} from "../../../actions/addWorkoutActions";
import { WorkoutDataProvider } from "../../../contexts/workoutDataContext";

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

const AddWorkout = ({
  modal,
  closeModal,
  title,
  addWorkoutTitle,
  addWorkoutNotes,
  resetNotes,
  notes
}) => {
  const context = {
    notes: notes,
    setNotes: addWorkoutNotes,
    resetNotes: resetNotes
  };
  return (
    <Modal
      contentLabel="Add Workout Modal"
      isOpen={modal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
    >
      <div className="add-workout-modal-content">
        <WorkoutTitle
          title={title}
          workoutTitle={addWorkoutTitle}
          closeModal={closeModal}
        />
        <WorkoutDataProvider value={context}>
          <WorkoutContent />
        </WorkoutDataProvider>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    title: state.addWorkoutReducer.title,
    notes: state.addWorkoutReducer.notes
  };
};

export default connect(
  mapStateToProps,
  { addWorkoutTitle, addWorkoutNotes, resetNotes }
)(AddWorkout);
