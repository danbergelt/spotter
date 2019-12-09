import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { SET_SAVE_MSG } from "../../../../../../actions/optionsActions";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import reFetch from "../../../../../../utils/reFetch";

// Save or Edit workout depending on global modal context
const SaveWorkout = React.memo(
  ({ workoutId, time, closeParentModal, ctx, iconClass }) => {
    const saveMsg = useSelector(state => state.optionsReducer.saveMsg);
    const workout = useSelector(state => state.workoutReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const date = useSelector(state => state.globalReducer.date);
    const scope = useSelector(state => state.globalReducer.scope);

    const saveHandler = async () => {
      // if user is adding a new workout
      if (ctx === "add") {
        try {
          await axiosWithAuth().post(
            `${process.env.REACT_APP_T_API}/api/auth/workouts`,
            {
              date: date.format("MMM DD YYYY"),
              title: workout.title,
              notes: workout.notes,
              exercises: workout.exercises,
              tags: workout.tags
            }
          );
          // refetch updated list of workouts
          await reFetch(time, history, scope.value);
          // // close modal and return to dashboard
          closeParentModal();
        } catch (err) {
          dispatch({
            type: SET_SAVE_MSG,
            payload: { error: err.response.data.error }
          });
        }
      }

      // if user is editing a saved workout
      if (ctx === "view") {
        try {
          await axiosWithAuth().put(
            `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`,
            {
              title: workout.title,
              notes: workout.notes,
              exercises: workout.exercises,
              tags: workout.tags
            }
          );
          // refetch updated list of workouts
          await reFetch(time, history, scope.value);
          // close modal and return to dashboard
          closeParentModal();
        } catch (err) {
          dispatch({
            type: SET_SAVE_MSG,
            payload: { error: err.response.data.error }
          });
        }
      }
    };

    return (
      <>
        <div
          data-testid="save-workout"
          onClick={saveHandler}
          className="add-workout-options-button publish"
        >
          <FiPlusCircle className={iconClass} />
          {ctx === "add" ? "Save" : "Update"}
        </div>
        {saveMsg.error && <div className="save error">{saveMsg.error}</div>}
      </>
    );
  }
);

export default SaveWorkout;
