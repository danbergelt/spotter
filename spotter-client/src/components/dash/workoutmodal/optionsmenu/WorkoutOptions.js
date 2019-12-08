import React from "react";
import { useSelector } from "react-redux";

// components
import TagsOption from "./options/tagsoption/TagsOption";
import SaveTemplateOption from "./options/savetemplate/SaveTemplateOption";
import FromTemplateOption from "./options/fromtemplate/FromTemplateOption";
import DeleteWorkout from "./options/deleteworkout/DeleteWorkout";
import SaveWorkout from "./options/saveworkout/SaveWorkout";

// container for sidebar menu on workout modal
const WorkoutOptions = React.memo(({ closeParentModal, time }) => {
  const iconClass = "add-workout-options-icon";
  const ctx = useSelector(state => state.globalReducer.ctx);
  const workoutId = useSelector(state => state.workoutReducer._id);

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <TagsOption iconClass={iconClass} />
        <SaveTemplateOption iconClass={iconClass} />
        <FromTemplateOption iconClass={iconClass} />
        <DeleteWorkout
          closeParentModal={closeParentModal}
          workoutId={workoutId}
          ctx={ctx}
          iconClass={iconClass}
        />
        <SaveWorkout
          time={time}
          closeParentModal={closeParentModal}
          workoutId={workoutId}
          ctx={ctx}
          iconClass={iconClass}
        />
      </div>
    </div>
  );
});

export default WorkoutOptions;
