import React, { memo } from "react";
import { useSelector } from "react-redux";

// components
import TagsOption from "./options/tagsoption/TagsOption";
import SaveTemplateOption from "./options/savetemplate/SaveTemplateOption";
import FromTemplateOption from "./options/fromtemplate/FromTemplateOption";
import ExerciseOption from "./options/exercises/ExerciseOption";
import DeleteWorkout from "./options/deleteworkout/DeleteWorkout";
import SaveWorkout from "./options/saveworkout/SaveWorkout";
import { State } from "src/types/State";

interface Props {
  closeParentModal: () => void;
  time: number
}

// container for sidebar menu on workout modal
const WorkoutOptions: React.FC<Props> = ({ closeParentModal, time }) => {
  const iconClass: string = "add-workout-options-icon";

  const fetchCtx = (state: State) => state.globalReducer.ctx;
  const ctx: string | null = useSelector(fetchCtx);

  const fetchWorkoutId = (state: State) => state.workoutReducer._id
  const workoutId: string | null = useSelector(fetchWorkoutId);

  return (
    <div className="add-workout-options-container">
      <h1 className="add-workout-options-title sub">ACTIONS</h1>
      <div className="add-workout-options-buttons">
        <TagsOption iconClass={iconClass} />
        <SaveTemplateOption iconClass={iconClass} />
        <FromTemplateOption iconClass={iconClass} />
        <ExerciseOption iconClass={iconClass} />
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
};

export default memo(WorkoutOptions);