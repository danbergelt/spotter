import React, { memo } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { SET_SAVE_MSG } from "../../../../../../actions/optionsActions";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import reFetch from "../../../../../../utils/reFetch";
import { State, WorkoutReducer } from "src/types/State";
import { Moment } from "moment";

interface Props {
  workoutId: string | null;
  time: number;
  closeParentModal: () => void;
  ctx: string | null;
  iconClass: string;
}

interface GlobalReducer {
  date: null | Moment;
  scope: { value: string; label: string };
  t: string | null;
}

// Save or Edit workout depending on global modal context
const SaveWorkout: React.FC<Props> = ({
  workoutId,
  time,
  closeParentModal,
  ctx,
  iconClass
}) => {
  const fetchSaveMsg = (state: State) => state.optionsReducer.saveMsg;
  const saveMsg: Partial<{ error: string }> = useSelector(fetchSaveMsg);

  const fetchWorkout = (state: State) => state.workoutReducer;
  const workout: WorkoutReducer = useSelector(fetchWorkout);

  const fetchGlobalReducer = (state: State) => state.globalReducer;
  const { date, scope, t }: GlobalReducer = useSelector(fetchGlobalReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const saveHandler: () => Promise<void> = async () => {
    // if user is adding a new workout
    if (ctx === "add") {
      try {
        await axiosWithAuth(t).post(
          `${process.env.REACT_APP_T_API}/api/auth/workouts`,
          {
            date: date && date.format("MMM DD YYYY"),
            title: workout.title,
            notes: workout.notes,
            exercises: workout.exercises,
            tags: workout.tags
          }
        );
        // refetch updated list of workouts
        await reFetch(time, history, scope.value, t);
        // // close modal and return to dashboard
        closeParentModal();
      } catch (err) {
        dispatch<{ type: string; payload: { error: string } }>({
          type: SET_SAVE_MSG,
          payload: { error: err.response.data.error }
        });
      }
    }

    // if user is editing a saved workout
    if (ctx === "view") {
      try {
        await axiosWithAuth(t).put(
          `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`,
          {
            title: workout.title,
            notes: workout.notes,
            exercises: workout.exercises,
            tags: workout.tags
          }
        );
        // refetch updated list of workouts
        await reFetch(time, history, scope.value, t);
        // close modal and return to dashboard
        closeParentModal();
      } catch (err) {
        dispatch<{ type: string; payload: { error: string } }>({
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
};

export default memo(SaveWorkout);
