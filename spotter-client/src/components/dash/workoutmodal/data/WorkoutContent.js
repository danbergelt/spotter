import React from "react";
import WorkoutData from "./WorkoutData";
import WorkoutOptions from "../optionsmenu/WorkoutOptions";

// container for options e.g. save workout, add template && data e.g. notes, title, etc

const WorkoutContent = React.memo(({ closeModal, week, date }) => {
  return (
    <div className="workout-body-container">
      <WorkoutData />
      <WorkoutOptions date={date} closeParentModal={closeModal} week={week} />
    </div>
  );
});

export default WorkoutContent;
