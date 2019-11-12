import React from "react";
import { FiPlus } from "react-icons/fi";

const WorkoutTags = () => {
  return (
    <div className="add-workout-data-tags">
      <h1 className="add-workout-data-tags-head">TAGS</h1>
      <div className="add-workout-data-tags-container">
        <div className="add-workout-data-tags-tag add">{<FiPlus />}</div>
      </div>
    </div>
  );
};

export default WorkoutTags;
