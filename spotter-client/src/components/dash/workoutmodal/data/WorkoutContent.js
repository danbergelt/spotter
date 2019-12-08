import React from "react";
import WorkoutData from "./WorkoutData";
import WorkoutOptions from "../optionsmenu/WorkoutOptions";

// container for options e.g. save workout, add template && data e.g. notes, title, etc

const WorkoutContent = React.memo(({ closeModal, time }) => {
  return (
    <div className="workout-body-container">
      <WorkoutData />
      <WorkoutOptions closeParentModal={closeModal} time={time} />
    </div>
  );
});

export default WorkoutContent;
