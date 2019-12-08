import React, { useState, useEffect, useCallback } from "react";
import WorkoutColumn from "./WorkoutColumn";
import WorkoutModal from "../workoutmodal/WorkoutModal";
import { generateWeek, dashHead } from "../../../utils/momentUtils";
import DashControls from "./DashControls";
import { useHistory } from "react-router-dom";
import reFetch from "../../../utils/reFetch";
import { useDispatch, useSelector } from "react-redux";
import { SET_DATE } from "../../../actions/timeScopeActions";
import { SET_SAVE_MSG } from "../../../actions/optionsActions";
import { MODAL_CTX } from "../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../actions/workoutActions";
import { RESET_TAGS } from "../../../actions/tagsActions";

const WorkoutColumns = () => {
  const history = useHistory();

  const [week, setWeek] = useState(0);

  const inc = () => {
    setWeek(week + 1);
  };

  const dec = () => {
    setWeek(week - 1);
  };

  // refetches data upon dashboard state change
  useEffect(() => {
    reFetch(week, history, scope.value);
  }, [week, history]);

  const [modal, setModal] = useState(false);
  const workouts = useSelector(state => state.fetchWorkoutsReducer.workouts);
  const scope = useSelector(state => state.globalReducer.scope);
  const dispatch = useDispatch();

  const openAddWorkoutModal = useCallback(date => {
    dispatch({ type: SET_DATE, payload: date })
    dispatch({ type: MODAL_CTX, payload: "add" });
    setModal(true);
  }, [dispatch]);

  const openViewModal = (workout, date) => {
    dispatch({ type: SET_DATE, payload: date })
    dispatch({ type: MODAL_CTX, payload: "view" });
    dispatch({ type: FROM_SAVED, payload: workout });
    setModal(true);
  };

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
      <DashControls inc={inc} dec={dec} time={week} month={dashHead} />
      <div className="week-workouts-days">
        {generateWeek(week).map((date, i) => (
          <WorkoutColumn
            date={date}
            key={i}
            i={i}
            week={week}
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            workouts={workouts}
          />
        ))}
      </div>
      <WorkoutModal
        time={week}
        modal={modal}
        closeModal={closeModal}
      />
    </>
  );
};

export default WorkoutColumns;
