import React from "react";
import { FiTag, FiPaperclip, FiSave, FiCopy, FiMove, FiDelete } from "react-icons/fi";

const AddWorkoutOptions = () => {
  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title">ADD</h1>
      <div className="add-workout-options-buttons">
        <div className="add-workout-options-button">
          <FiTag className="add-workout-options-icon" /> Tags
        </div>
        <div className="add-workout-options-button">
          <FiPaperclip className="add-workout-options-icon" /> Attachment
        </div>
      </div>
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <div className="add-workout-options-button">
          <FiMove className="add-workout-options-icon" /> Move
        </div>
        <div className="add-workout-options-button">
          <FiSave className="add-workout-options-icon" /> Save Workout
        </div>
        <div className="add-workout-options-button">
          <FiCopy className="add-workout-options-icon" /> Copy
        </div>
        <div className="add-workout-options-button">
          <FiDelete className="add-workout-options-icon" /> Delete
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutOptions;
