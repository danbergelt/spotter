import React, { memo } from "react";
import WorkoutData from "./WorkoutData";
import WorkoutOptions from "../optionsmenu/WorkoutOptions";

// container for options e.g. save workout, add template && data e.g. notes, title, etc

interface Props {
  closeModal: () => void;
  time: number
}

const WorkoutContent: React.FC<Props> = ({ closeModal, time }) => {
  return (
    <div className="workout-body-container">
      <WorkoutData />
      <WorkoutOptions closeParentModal={closeModal} time={time} />
    </div>
  );
};

export default memo(WorkoutContent);
