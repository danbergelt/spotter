import React from "react";
import {
  FiTag,
  FiPlusCircle,
  FiSave,
  FiMove,
  FiDelete,
  FiPackage
} from "react-icons/fi";

const WorkoutOptions = () => {
  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title">CREATE</h1>
      <div className="add-workout-options-buttons">
        <div className="add-workout-options-button">
          <FiTag className="add-workout-options-icon" /> Tags
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
          <FiPackage className="add-workout-options-icon" /> From Template
        </div>
        <div className="add-workout-options-button">
          <FiDelete className="add-workout-options-icon" /> Delete
        </div>
        <div className="add-workout-options-button publish">
          <FiPlusCircle className="add-workout-options-icon" /> Publish
        </div>
      </div>
    </div>
  );
};

export default WorkoutOptions;
