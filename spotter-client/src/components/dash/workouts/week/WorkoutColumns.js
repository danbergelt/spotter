import React, { useState, useEffect, useCallback } from "react";
import WorkoutColumn from "./WorkoutColumn";
import WorkoutModal from "../../workoutmodal/WorkoutModal";
import { generateWeek, dashHead } from "../../../../utils/momentUtils";
import DashControls from "../DashControls";
import { useHistory } from "react-router-dom";
import reFetch from "../../../../utils/reFetch";
import { useDispatch, useSelector } from "react-redux";
import { SET_DATE } from "../../../../actions/timeScopeActions";
import { SET_SAVE_MSG } from "../../../../actions/optionsActions";
import { MODAL_CTX } from "../../../../actions/ctxActions";
import {
  RESET_WORKOUT,
  RESET_QUEUE,
  FROM_SAVED
} from "../../../../actions/workoutActions";
import { RESET_TAGS } from "../../../../actions/tagsActions";
import { fetchExercises } from "../../../../actions/fetchExercisesActions";

const WorkoutColumns = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [week, setWeek] = useState(0);
  const [modal, setModal] = useState(false);
  const workouts = useSelector(state => state.fetchWorkoutsReducer.workouts);
  const scope = useSelector(state => state.globalReducer.scope);
  const t = useSelector(state => state.globalReducer.t);

  const inc = () => {
    setWeek(week + 1);
  };

  const dec = () => {
    setWeek(week - 1);
  };

  // refetches data upon dashboard state change
  useEffect(() => {
    reFetch(week, history, scope.value, t);
  }, [week, history, scope.value, t]);

  // opens modal to add a new workout
  const openAddWorkoutModal = useCallback(
    date => {
      dispatch({ type: SET_DATE, payload: date });
      dispatch({ type: MODAL_CTX, payload: "add" });
      setModal(true);
      dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
  );

  // opens modal to view a saved workout
  const openViewModal = useCallback(
    (workout, date) => {
      dispatch({ type: SET_DATE, payload: date });
      dispatch({ type: MODAL_CTX, payload: "view" });
      dispatch({ type: FROM_SAVED, payload: workout });
      setModal(true);
      dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
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
      <WorkoutModal time={week} modal={modal} closeModal={closeModal} />
    </div>
  );
};

export default WorkoutColumns;
