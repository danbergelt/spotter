import React from "react";
import { FiTrendingUp } from "react-icons/fi";

const ExerciseOption = ({ iconClass }) => {
  return (
    <>
      <div className="add-workout-options-button">
        <FiTrendingUp className={iconClass} /> Exercises
      </div>
    </>
  );
};

export default ExerciseOption;
