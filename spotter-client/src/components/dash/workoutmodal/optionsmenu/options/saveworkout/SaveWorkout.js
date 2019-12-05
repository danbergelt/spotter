import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { saveWorkout, editWorkout } from "./calls";
import { SET_SAVE_MSG } from "../../../../../../actions/optionsActions";
import { useHistory } from "react-router-dom";

const SaveWorkout = ({
  date,
  workoutId,
  week,
  closeParentModal,
  ctx,
  iconClass
}) => {
  const saveMsg = useSelector(state => state.optionsReducer.saveMsg);
  const workout = useSelector(state => state.workoutReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const saveWorkoutErr = err => {
    dispatch({
      type: SET_SAVE_MSG,
      payload: { error: err.response.data.error }
    });
  };

  const saveHandler = async () => {
    if (ctx === "add") {
      saveWorkout(
        date,
        workout,
        closeParentModal,
        saveWorkoutErr,
        week,
        history
      );
    }

    if (ctx === "view") {
      editWorkout(
        workoutId,
        workout,
        week,
        history,
        closeParentModal,
        saveWorkoutErr
      );
    }
  };

  return (
    <>
      <div onClick={saveHandler} className="add-workout-options-button publish">
        <FiPlusCircle className={iconClass} />
        {ctx === "add" ? "Save" : "Update"}
      </div>
      {saveMsg.error && <div className="save error">{saveMsg.error}</div>}
    </>
  );
};

export default SaveWorkout;
