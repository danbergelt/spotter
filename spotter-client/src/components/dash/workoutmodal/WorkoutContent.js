import React from "react";
import WorkoutData from "./data/WorkoutData";
import WorkoutOptions from "./optionsmenu/optionscontainer/WorkoutOptions";

const WorkoutContent = ({ closeModal, week, date }) => {
  return (
    <div className="workout-body-container">
      <WorkoutData />
      <WorkoutOptions date={date} closeParentModal={closeModal} week={week} />
    </div>
  );
};

export default WorkoutContent;
