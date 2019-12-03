import React, { useCallback } from "react";
import { FiX } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_WORKOUT_TITLE } from "../../../../actions/workoutActions";

const WorkoutTitle = ({ closeModal }) => {
  const title = useSelector(state => state.workoutReducer.title);

  const dispatch = useDispatch();

  const addWorkoutTitle = useCallback(
    val => {
      dispatch({ type: ADD_WORKOUT_TITLE, payload: val });
    },
    [dispatch]
  );

  return (
    <div className="workout-modal-head">
      <div className="workout-modal-head-left">
        <FaCircle className="workout-spotter-logo" />
        <input
          placeholder={"Click to enter a title..."}
          value={title}
          onChange={e => addWorkoutTitle(e.target.value)}
          className="workout-title"
        />
      </div>
      <div onClick={closeModal} className="workout-exit-modal">
        <FiX data-testid="exit-modal" />
      </div>
    </div>
  );
};

export default WorkoutTitle;
