import React, { useState, useCallback, useEffect } from "react";
import { generateMonth, monthDashHead } from "../../../utils/momentUtils";
import DashControls from "./DashControls";
import GridDay from "./GridDay";
import { useSelector, useDispatch } from "react-redux";
import { SET_SAVE_MSG } from "../../../actions/optionsActions";
import { RESET_TAGS } from "../../../actions/tagsActions";
import { MODAL_CTX } from "../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../actions/workoutActions";
import WorkoutModal from "../workoutmodal/WorkoutModal";
import { SET_DATE } from "../../../actions/timeScopeActions";
import { useHistory } from 'react-router-dom';
import reFetch from '../../../utils/reFetch';

const WorkoutGrid = () => {
  const [month, setMonth] = useState(0);
  const history = useHistory();

  useEffect(() => {
    reFetch(month, history, scope.value);
  }, [month, history]);

  const inc = () => {
    setMonth(month + 1);
  };

  const dec = () => {
    setMonth(month - 1);
  };

  const [modal, setModal] = useState(false);
  const workouts = useSelector(state => state.fetchWorkoutsReducer.workouts);
  const scope = useSelector(state => state.globalReducer.scope);
  const dispatch = useDispatch();

  const openAddWorkoutModal = useCallback(
    date => {
      dispatch({ type: SET_DATE, payload: date });
      dispatch({ type: MODAL_CTX, payload: "add" });
      setModal(true);
    },
    [dispatch]
  );

  const openViewModal = useCallback(
    workout => {
      dispatch({ type: MODAL_CTX, payload: "view" });
      dispatch({ type: FROM_SAVED, payload: workout });
      setModal(true);
    },
    [dispatch]
  );

  const date = useSelector(state => state.globalReducer.date)

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
    <>
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
          />
        ))}
        <WorkoutModal
          date={date}
          time={month}
          modal={modal}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default WorkoutGrid;
