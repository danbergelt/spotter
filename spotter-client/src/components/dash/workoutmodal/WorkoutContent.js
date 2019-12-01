import React from "react";
import WorkoutData from "./data/WorkoutData";
import WorkoutOptions from "./options/WorkoutOptions";

const WorkoutContent = ({ closeModal, week }) => {
  return (
    <div className="workout-body-container">
      <WorkoutData />
      <WorkoutOptions closeParentModal={closeModal} week={week} />
    </div>
  );
};

export default WorkoutContent;
