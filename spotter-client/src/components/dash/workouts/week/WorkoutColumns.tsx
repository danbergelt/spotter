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
import { State } from "src/types/State";
import { Workout } from "src/types/Workout";
import { Moment } from "moment";

interface GlobalReducer {
  scope: { value: string; label: string };
  t: string | null;
}

const WorkoutColumns = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [week, setWeek] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  const fetchWorkouts = (state: State) => state.fetchWorkoutsReducer.workouts;
  const workouts: Array<Workout> = useSelector(fetchWorkouts);

  const globalReducer = (state: State) => state.globalReducer;
  const { scope, t }: GlobalReducer = useSelector(globalReducer);

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
  const openAddWorkoutModal: (date: Moment) => void = useCallback(
    date => {
      dispatch<{ type: string; payload: Moment }>({
        type: SET_DATE,
        payload: date
      });
      dispatch<{ type: string; payload: string }>({
        type: MODAL_CTX,
        payload: "add"
      });
      setModal(true);
      dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
  );

  // opens modal to view a saved workout
  const openViewModal: (workout: Workout, date: Moment) => void = useCallback(
    (workout, date) => {
      dispatch<{ type: string; payload: Moment }>({
        type: SET_DATE,
        payload: date
      });
      dispatch<{ type: string; payload: string }>({
        type: MODAL_CTX,
        payload: "view"
      });
      dispatch<{ type: string; payload: Workout }>({
        type: FROM_SAVED,
        payload: workout
      });
      setModal(true);
      dispatch(fetchExercises(history, t));
    },
    [dispatch, history, t]
  );

  // resets state in various parts of application upon workout modal close
  const closeModal: () => void = useCallback(() => {
    setModal(false);
    dispatch<{ type: string }>({ type: RESET_WORKOUT });
    dispatch<{ type: string }>({ type: RESET_TAGS });
    dispatch<{ type: string }>({ type: RESET_QUEUE });
    dispatch<{ type: string; payload: null }>({
      type: MODAL_CTX,
      payload: null
    });
    dispatch<{ type: string; payload: string }>({
      type: SET_SAVE_MSG,
      payload: ""
    });
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
