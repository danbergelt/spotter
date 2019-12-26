import React, { useCallback } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { SET_EXERCISES } from "../../../../../../actions/optionsActions";
import Exercises from "./Exercises";

interface Props {
  iconClass: string;
}

const ExerciseOption: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const setExercisesModal: (state: boolean) => void = useCallback(
    state => {
      dispatch<{ type: string; payload: boolean }>({
        type: SET_EXERCISES,
        payload: state
      });
    },
    [dispatch]
  );

  return (
    <>
      <div
        onClick={() => setExercisesModal(true)}
        data-testid="exercises-modal"
        className="add-workout-options-button"
      >
        <FiTrendingUp className={iconClass} /> Exercises
      </div>
      <Exercises setExercisesModal={setExercisesModal} />
    </>
  );
};

export default ExerciseOption;
