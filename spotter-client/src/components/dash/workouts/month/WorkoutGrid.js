import React, { useState, useCallback, useEffect } from "react";
import { generateMonth, monthDashHead } from "../../../../utils/momentUtils";
import DashControls from "../DashControls";
import GridDay from "./GridDay";
import { useSelector, useDispatch } from "react-redux";
import { SET_SAVE_MSG } from "../../../../actions/optionsActions";
import { RESET_TAGS } from "../../../../actions/tagsActions";
import { MODAL_CTX } from "../../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../../actions/workoutActions";
import WorkoutModal from "../../workoutmodal/WorkoutModal";
import { SET_DATE } from "../../../../actions/timeScopeActions";
import { useHistory } from "react-router-dom";
import reFetch from "../../../../utils/reFetch";
import { fetchExercises } from "../../../../actions/fetchExercisesActions";

const WorkoutGrid = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [month, setMonth] = useState(0);
  const [modal, setModal] = useState(false);
  const [popover, setPopover] = useState({ open: false, id: null });
  const workouts = useSelector(state => state.fetchWorkoutsReducer.workouts);
  const scope = useSelector(state => state.globalReducer.scope);

  // fetches up-to-date list of workouts on re-render
  useEffect(() => {
    reFetch(month, history, scope.value);
  }, [month, history, scope.value]);

  const inc = () => {
    setMonth(month + 1);
  };

  const dec = () => {
    setMonth(month - 1);
  };

  // opens modal to add a new workout
  const openAddWorkoutModal = useCallback(
    date => {
      dispatch({ type: SET_DATE, payload: date });
      dispatch({ type: MODAL_CTX, payload: "add" });
      setModal(true);
      fetchExercises(history);
    },
    [dispatch, history]
  );

  // opens modal to view a saved workout
  const openViewModal = useCallback(
    workout => {
      dispatch({ type: MODAL_CTX, payload: "view" });
      dispatch({ type: FROM_SAVED, payload: workout });
      setModal(true);
      fetchExercises(history);
    },
    [dispatch, history]
  );

  // resets state in various parts of application upon workout modal close
  const closeModal = useCallback(() => {
    setModal(false);
    dispatch({ type: RESET_WORKOUT });
    dispatch({ type: RESET_TAGS });
    dispatch({ type: RESET_QUEUE });
    dispatch({ type: MODAL_CTX, payload: null });
    dispatch({ type: SET_SAVE_MSG, payload: "" });
  }, [dispatch]);

  return (
    <div className="spacer">
      <DashControls inc={inc} dec={dec} time={month} month={monthDashHead} />
      <div className="month-workout-days">
        {generateMonth(month).map((date, i) => (
          <GridDay
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            key={date.format("MMM DD YYYY")}
            date={date}
            i={i}
            workouts={workouts}
            popover={popover}
            setPopover={setPopover}
          />
        ))}
        <WorkoutModal time={month} modal={modal} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default WorkoutGrid;
