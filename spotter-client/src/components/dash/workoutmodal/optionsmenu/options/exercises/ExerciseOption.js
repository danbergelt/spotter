import React, { useCallback } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { SET_EXERCISES } from "../../../../../../actions/optionsActions";
import Exercises from "./Exercises";

const ExerciseOption = ({ iconClass }) => {
  const dispatch = useDispatch();

  const setExercisesModal = useCallback(
    state => {
      dispatch({ type: SET_EXERCISES, payload: state });
    },
    [dispatch]
  );

  return (
    <>
      <div
        onClick={() => setExercisesModal(true)}
        className="add-workout-options-button"
      >
        <FiTrendingUp className={iconClass} /> Exercises
      </div>
      <Exercises setExercisesModal={setExercisesModal} />
    </>
  );
};

export default ExerciseOption;
