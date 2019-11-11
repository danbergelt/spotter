import React from "react";
import {
  FiTag,
  FiPlusCircle,
  FiSave,
  FiMove,
  FiDelete,
  FiPackage
} from "react-icons/fi";

import WorkoutOption from "./WorkoutOption";

const WorkoutOptions = () => {

  const iconClass = "add-workout-options-icon"

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title">CREATE</h1>
      <div className="add-workout-options-buttons">
        <WorkoutOption
          text={"Tags"}
          icon={<FiTag className={iconClass} />}
        />
      </div>
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <WorkoutOption
          text={"Move"}
          icon={<FiMove className={iconClass} />}
        />
        <WorkoutOption
          text={"Save Workout"}
          icon={<FiSave className={iconClass} />}
        />
        <WorkoutOption
          text={"From Template"}
          icon={<FiPackage className={iconClass} />}
        />
        <WorkoutOption
          text={"Delete"}
          icon={<FiDelete className={iconClass} />}
        />
        <div className="add-workout-options-button publish">
          <FiPlusCircle className={iconClass} /> Publish
        </div>
      </div>
    </div>
  );
};

export default WorkoutOptions;
